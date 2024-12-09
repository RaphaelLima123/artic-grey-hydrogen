import {useFetcher} from '@remix-run/react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {useCallback, useEffect, useState} from 'react';
import LeftArrow from '~/assets/svgs/left-arrow.svg';
import RightArrow from '~/assets/svgs/right-arrow.svg';
import ReviewStarIcon from '~/assets/svgs/start-product-review.svg';
import type {TrendingAPIResponse} from './Trending.types';
import {CartForm} from '@shopify/hydrogen';

const Trending = () => {
  const [products, setProducts] = useState<Product[]>();
  const [selectedSubscription, setSelectedSubscription] = useState<string[]>(
    [],
  );
  const [cursor, setCursor] = useState<string>();

  const {load, data} = useFetcher({key: 'trending-collection'});
  const incrementFetcher = useFetcher({key: 'cart-increment'});

  useEffect(() => {
    load('/api/trending-collection');
  }, [load]);

  useEffect(() => {
    const typedData = data as TrendingAPIResponse;
    if (typedData) {
      setProducts(typedData.products);
      setCursor(typedData.cursor);
    }
  }, [data]);

  const handleSubscriptionSelected = useCallback((id: string, plan: string) => {
    if (plan === 'subscribe') {
      setSelectedSubscription((prev) => {
        const included = prev.includes(id);
        return included ? prev : [...prev, id];
      });
    }

    if (plan === 'purchase') {
      setSelectedSubscription((prev) => {
        const included = prev.includes(id);
        return included ? prev.filter((item) => item !== id) : prev;
      });
    }
  }, []);

  const renderSellingPlan = (product: Product) => (
    <div className="flex flex-col gap-2">
      {product.sellingPlanGroups.nodes.map((sellingPlanGroup) =>
        sellingPlanGroup.sellingPlans.edges.map(({node}) => {
          const priceAdjustment = node.priceAdjustments[0]?.adjustmentValue as {
            adjustmentPercentage: number;
          };

          const sellingPlanId = node.id;

          const price = parseFloat(product.variants.nodes[0].price.amount);
          const percentageDiscount = priceAdjustment.adjustmentPercentage;

          const discountedPrice = price - (price * percentageDiscount) / 100;

          return (
            <div key={node.id} className="flex flex-col gap-2.5">
              <div className="flex flex-row justify-between gap-2.5">
                <div className="flex flex-col bg-[#F6F6F5] rounded p-2.5 gap-1">
                  <div className="flex flex-row items-baseline gap-2">
                    <input
                      type="radio"
                      name={`selling-plan-${product.variants.nodes[0].id}`}
                      aria-label="One-Time Purchase"
                      onClick={() =>
                        handleSubscriptionSelected(
                          product.variants.nodes[0].id,
                          'purchase',
                        )
                      }
                      defaultChecked
                    />
                    <p className="text-xs">One-Time Purchase</p>
                  </div>
                  <div className="flex flex-row gap-1 ">
                    <p className="text-xs font-medium">${price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col bg-[#F6F6F5] rounded p-2.5 gap-1">
                  <div className="flex flex-row items-baseline gap-2">
                    <input
                      type="radio"
                      name={`selling-plan-${product.variants.nodes[0].id}`}
                      aria-label="Subscribe & Save"
                      onClick={() =>
                        handleSubscriptionSelected(
                          product.variants.nodes[0].id,
                          'subscribe',
                        )
                      }
                    />
                    <p className="text-xs">Subscribe & Save</p>
                  </div>
                  <div className="flex flex-row gap-1 ">
                    <p className="text-xs font-medium">
                      ${discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-amber-900 font-medium">
                      Save {percentageDiscount}%
                    </p>
                  </div>
                </div>
              </div>
              <CartForm
                fetcherKey="cart-increment"
                key={node.id}
                route="/api/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [
                    {
                      merchandiseId: product.variants.nodes[0].id,
                      quantity: 1,
                      sellingPlanId: selectedSubscription.includes(product.id)
                        ? sellingPlanId
                        : undefined,
                    },
                  ],
                }}
              >
                <button
                  className="flex justify-center items-center w-full text-white bg-black py-3.5 rounded-lg"
                  type="submit"
                >
                  <p className="text-sm text-center">
                    {selectedSubscription.includes(product.variants.nodes[0].id)
                      ? `Add to Cart - $${discountedPrice.toFixed(2)}`
                      : `Add to Cart - $${price.toFixed(2)}`}
                  </p>
                </button>
              </CartForm>
              <a
                href={product.onlineStoreUrl || `/products/${product.handle}`}
                className="flex justify-center"
              >
                <p className="text-xs text-[#1B1F23]">View Full Details</p>
              </a>
            </div>
          );
        }),
      )}
    </div>
  );

  const withoutSellingPlan = (product: Product) => (
    <div className="flex flex-col">
      <div className="flex flex-row gap-1 mb-4">
        {product.tags.map((tag) =>
          tag !== 'best-seller' ? (
            <div
              key={tag}
              className="flex flex-row items-center gap-1 bg-[#F6F6F5] px-2.5 py-1.5 rounded"
            >
              <div className="w-1 h-1 rounded-full bg-black"></div>
              <p className="text-xs">{tag}</p>
            </div>
          ) : null,
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-medium">{product.title}</p>
        <p className="text-xs text-gray-900 text-opacity-70">
          {product.description}
        </p>
      </div>
      <div className="flex flex-row justify-between mt-2">
        <button className="flex flex-row items-center gap-1">
          {Array.from({length: 5}, (_, index) => (
            <img
              key={index}
              src={ReviewStarIcon}
              alt={`star-${index}`}
              height={12}
              width={12}
            />
          ))}
        </button>
        {product.variants.nodes.map((variant) => {
          return (
            <CartForm
              fetcherKey="cart-increment"
              key={variant.id}
              route="/api/cart"
              action={CartForm.ACTIONS.LinesAdd}
              inputs={{
                lines: [{merchandiseId: variant.id, quantity: 1}],
              }}
            >
              <button
                className="flex items-center justify-center text-white bg-black px-4 py-1.5 rounded-lg"
                type="submit"
              >
                <p className="text-sm">Add • ${variant.price.amount}</p>
              </button>
            </CartForm>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between items-center gap-16 px-10 py-20">
      <div className="flex flex-row gap-14">
        <button className="flex justify-center items-center border-1 rounded w-10 h-10 mt-4 border-[#1B1F231A]">
          <img src={LeftArrow} alt="left-arrow" />
        </button>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-sm">🌟 Trending</span>
          <h2 className="text-5xl font-medium mb-4">Supplements</h2>
          <a href="/collections/supplements" className="underline">
            View all
          </a>
        </div>
        <button className="flex justify-center items-center border-1 rounded w-10 h-10 mt-4 border-[#1B1F231A]">
          <img src={RightArrow} alt="right-arrow" />
        </button>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        {products?.map((product) => {
          return (
            <div
              key={product.id}
              className="flex flex-col max-w-[365px] h-[505px] bg-white rounded-lg px-5 pt-6 pb-4"
            >
              <img
                className="object-cover w-full h-[314px]"
                src={product.featuredImage?.url}
                alt={product.title}
                width={314}
                height={314}
                sizes="(max-width: 768px) 100vw, 365px"
              />
              <div>
                {product.sellingPlanGroups.nodes.length > 0
                  ? renderSellingPlan(product)
                  : withoutSellingPlan(product)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;

import type {CartProps} from './Cart.types';
import {Suspense} from 'react';
import CloseIcon from '~/assets/svgs/close.svg';
import formatCurrency from '~/utils/formatCurrency';
import {Await, useFetcher} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import PlusIcon from '~/assets/svgs/plus.svg';
import MinusIcon from '~/assets/svgs/minus.svg';
import ReturnIcon from '~/assets/svgs/return.svg';

const Cart = ({cart, onToggle, cartOpened}: CartProps) => {
  const paidShipping = (total: number) => (
    <div className="flex flex-row gap-1">
      <p>You are </p>
      <p className="font-medium">{formatCurrency.numberToCurrency(total)}</p>
      <p>away from eligible for free shipping</p>
    </div>
  );

  return (
    <Suspense>
      <Await
        resolve={cart}
        errorElement={<div>There was an error loading your cart</div>}
      >
        {(resolvedValue) => {
          const lines = resolvedValue?.lines.nodes;
          const total = parseFloat(
            resolvedValue?.cost.totalAmount.amount || '0',
          );

          const percentage = Math.min((total / 80) * 100, 100);

          return (
            <div
              className={`flex flex-col py-7 h-full ${
                !cartOpened && 'opacity-0'
              }`}
            >
              <div className="flex flex-row w-full px-8">
                <div className="flex flex-row gap-3 w-full">
                  <span className="text-4xl font-medium">Your Bag</span>
                  <div className="flex justify-center items-center bg-black rounded-full h-[36px] w-[36px]">
                    <p className="text-white">{lines?.length}</p>
                  </div>
                </div>
                <button onClick={onToggle}>
                  <img src={CloseIcon} alt="Close Icon" />
                </button>
              </div>

              <div className="w-full h-px bg-gray-900/10 mt-6 mb-7"></div>
              <div className="flex flex-col justify-center items-center gap-2 px-8 mb-5">
                {total > 80 ? (
                  <p>Free Shipping For This Order</p>
                ) : (
                  paidShipping(total)
                )}
                <div className="flex flex-row justify-center items-center gap-4 w-full">
                  <p className="text-sm">$0</p>
                  <div className="relative w-full h-1 rounded bg-[#00000029]">
                    <div
                      className="absolute top-0 left-0 h-1 rounded bg-black"
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                  <p className="text-sm">$80.00</p>
                </div>
              </div>

              <div className="bg-gray-100 mx-8 rounded-xl overflow-y-auto scrollbar-hidden max-h-[calc(100vh-150px)]">
                {lines?.map((line) => {
                  const {quantity, cost, merchandise, sellingPlanAllocation} =
                    line;

                  const merchandiseSellingGroup =
                    merchandise.product?.sellingPlanGroups?.nodes[0];

                  return (
                    <div
                      key={line.id}
                      className="flex flex-row gap-4 m-4 p-4 bg-white rounded-lg"
                    >
                      <img
                        src={merchandise.image?.url}
                        alt={merchandise.image?.altText || 'product-image'}
                        width={90}
                        height={90}
                      />
                      <div className="flex flex-col w-full gap-3">
                        <div className="flex justify-between">
                          <p className="font-medium">
                            {merchandise.product.title}
                          </p>
                          <p className="font-medium">
                            ${cost.totalAmount.amount}
                          </p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row items-center gap-3 border border-[#00000033] px-2 py-1 rounded-xl w-fit">
                            {quantity === 1 ? (
                              <CartForm
                                fetcherKey="cart-increment"
                                route="/api/cart"
                                action={CartForm.ACTIONS.LinesRemove}
                                inputs={{lineIds: [line.id]}}
                              >
                                <button className="text-lg font-bold h-full">
                                  <img src={MinusIcon} alt="Minus Icon" />
                                </button>
                              </CartForm>
                            ) : (
                              <CartForm
                                fetcherKey="cart-increment"
                                route="/api/cart"
                                action={CartForm.ACTIONS.LinesUpdate}
                                inputs={{
                                  lines: [
                                    {
                                      id: line.id,
                                      merchandiseId:
                                        merchandise.product.variants.nodes[0]
                                          .id,
                                      quantity: quantity - 1,
                                    },
                                  ],
                                }}
                              >
                                <button className="text-lg font-bold">
                                  <img src={MinusIcon} alt="Minus Icon" />
                                </button>
                              </CartForm>
                            )}
                            <p className="text-xs mx-1.5">{quantity}</p>
                            <CartForm
                              fetcherKey="cart-increment"
                              route="/api/cart"
                              action={CartForm.ACTIONS.LinesAdd}
                              inputs={{
                                lines: [
                                  {
                                    merchandiseId:
                                      merchandise.product.variants.nodes[0].id,
                                    quantity: 1,
                                    sellingPlanId:
                                      sellingPlanAllocation?.sellingPlan.id,
                                  },
                                ],
                              }}
                            >
                              <button className="text-lg font-bold">
                                <img src={PlusIcon} alt="Plus Icon" />
                              </button>
                            </CartForm>
                          </div>
                          {!sellingPlanAllocation?.sellingPlan &&
                            merchandiseSellingGroup?.sellingPlans.nodes[0]
                              .id && (
                              <CartForm
                                fetcherKey="cart-increment"
                                route="/api/cart"
                                action={CartForm.ACTIONS.LinesUpdate}
                                inputs={{
                                  lines: [
                                    {
                                      id: line.id,
                                      merchandiseId:
                                        merchandise.product.variants.nodes[0]
                                          .id,
                                      quantity,
                                      sellingPlanId:
                                        merchandiseSellingGroup?.sellingPlans
                                          .nodes[0].id,
                                    },
                                  ],
                                }}
                              >
                                <button className="flex flex-row justify-center items-center py-2.5 px-4 gap-2 border border-dotted border-[#0E0804B2] rounded-md">
                                  <img
                                    src={ReturnIcon}
                                    width={14}
                                    height={14}
                                    alt="Return Icon"
                                  />
                                  <p className="text-xs">
                                    Subscribe & Save 10%
                                  </p>
                                </button>
                              </CartForm>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Cart;

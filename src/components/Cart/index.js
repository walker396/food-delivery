import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCount, increaseCount, clearCart } from '../../store/modules/takeaway'
import { useEffect, useState } from 'react'

const Cart = () => {
  const { cartList } = useSelector(state => state.foods);
  const totalPrice = cartList.reduce((a, c) => a + c.price * c.count, 0)
  const dispatch = useDispatch();
  const [cartVisible, setCartVisible] = useState(false);
  const onShow = () => {
    if (cartList.length > 0) {
      setCartVisible(true)
    } else {
      setCartVisible(false)
    }
  }
  useEffect(() => {
    if (cartList.length === 0) {
      setCartVisible(false)
    }
  }, [cartList])
  return (
    <div className="cartContainer">
      {/* Overlay, add 'visible' class name to show */}
      <div
        className={classNames('cartOverlay', { 'visible': cartVisible })}
        onClick={() => setCartVisible(false)}
      />
      <div className="cart">
        {/* fill, add 'fill' class name to toggle cart status */}
        {/* Cart quantity */}
        <div className={classNames('icon', { 'fill': cartList.length > 0 })} onClick={onShow}>
          {cartList.length > 0 && <div className="cartCornerMark">{cartList.length}</div>}
        </div>
        {/* Cart price */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">Estimated additional delivery fee ¥5</span>
        </div>
        {/* Checkout or Minimum order */}
        {cartList.length > 0 ? (
          <div className="goToPreview">Proceed to Checkout</div>
        ) : (
          <div className="minFee">Minimum order ¥20</div>
        )}
      </div>
      {/* Add 'visible' class name, div will be shown */}
      <div className={classNames('cartPanel', { 'visible': cartList.length > 0 && cartVisible })}>
        <div className="header">
          <span className="text">Shopping Cart</span>
          <span className="clearCart" onClick={() => { dispatch(clearCart()) }}>
            Clear Cart
          </span>
        </div>

        {/* Cart list */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={() => dispatch(increaseCount(item.id))}
                    onMinus={() => dispatch(decreaseCount(item.id))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart

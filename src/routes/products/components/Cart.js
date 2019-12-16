import React, {Component} from 'react';
import { connect } from 'dva';
import { Drawer } from 'antd';
import styles from './Cart.css';
import DrawerProduct from '../../../components/DrawerProduct'

class Cart extends Component {

  constructor(props){
    super(props);

    this.state = {
      total: 0,
      selectCounts: 0
    }
  }

  calTotal = () => {
    let selectCounts = 0;
    let total = 0;
    let {cart} = this.props;
    cart.forEach((item) => {
      if(item.checked){
        selectCounts += item.counts;
        total += item.counts * item.price;
      }
    });
    this.setState({
      total,
      selectCounts
    })
  }

  dealWithMoney = (price) => {
    return '$' + (price.toFixed(2));
  }

  componentDidMount(){
    this.calTotal();
  }

  render(){
    const {visible, onClose, cart} = this.props;
    const {total, selectCounts} = this.state;

    return (
      <Drawer
        className={styles.drawer}
        title="Shopping Cart"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={400}
      >
        {
          cart.length ? (
            <div>
              <div>
                {
                  cart.map((item) => {
                    return (
                      <DrawerProduct product={item} key={item.id} calTotal={this.calTotal} />
                    )
                  })
                }
              </div>
              <div>
                <div>
                  <p className={styles.info}><span className={styles.tip}>SUBTOTAL</span><span className={styles.body}>{this.dealWithMoney(total)}</span></p>
                  <p className={styles.info}><span className={styles.tip}>COUNTS</span><span className={styles.body}>{selectCounts}</span></p>
                </div>
                <button className={`${styles.btn} ${selectCounts > 0 ? '' : styles['btn-disabled']}`}>CHECKOUT</button>
              </div>
            </div>
          ) : <p>There is Nothing in Your Cart!</p>
        }
      </Drawer>
    );
  }
};

const mapStateToProps = ({ products })=>{
  return {
    counts: products.counts,
    cart: products.cart
  }
};

export default connect(mapStateToProps, null)(Cart);

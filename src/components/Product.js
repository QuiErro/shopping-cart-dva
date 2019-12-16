import React, {Component} from 'react';
import { connect } from 'dva';
import styles from './Product.css'
import { Card, message } from 'antd';

class Product extends Component{
  constructor(props){
    super(props);

    this.state = {
      isHover: false
    };
  }

  dealWithMoney = (product) => {
    let [main, tail] = ('' + product.price).split('.');
    tail = tail ? (tail.length >= 2 ? tail : tail + '0'): '00';

    return (
      <p className={styles.price}>
        {product.currencyFormat}
        <span style={{ display: 'inline-block', marginLeft: '3px', fontSize: '24px', color: '#333'}}>{main}</span>
        {'.' + tail}
      </p>
    )
  }

  isOnHoverStatus = (flag) => {
    this.setState({
      isHover: flag
    })
  }

  render(){
    const {product} = this.props;
    const {isHover} = this.state;

    return(
      <div
        className={styles.container}
        onMouseEnter={()=> this.isOnHoverStatus(true)}
        onMouseLeave={()=> this.isOnHoverStatus(false)}
      >
        <Card
          className={styles.card}
          hoverable={true}
          style={{ width: 240 }}
          cover={<img src={product.bigImage} alt="Images..." />}
        >
          <div className={styles.intro}>
            <p className={styles.desc}>{product.title}</p>
            <p className={styles.line}></p>
            { this.dealWithMoney(product) }
            { product.installments ? (
              <p className={styles.installments}>{`or ${product.installments} × $ ${(product.price / product.installments).toFixed(2)}`}</p>
            ) : null }
          </div>
          <button
            className={`${styles.btn} ${isHover ? styles.hover : ''}`}
            onClick={() => this.props.addProduct(product)}
          >Add to Cart</button>
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addProduct(data){
      dispatch({ type: 'products/addToCart', payload: {data}});
      message.success('Add Successfully!');
    }
  }
};

export default connect(null, mapDispatchToProps)(Product);

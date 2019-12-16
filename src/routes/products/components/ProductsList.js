import React, {Component} from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Product from '../../../components/Product';
import styles from './ProductsList.css'

class ProductsList extends Component{

  render(){
    const {list, loading} = this.props;

    return (
      <div className={styles.container}>
        {
          !loading && list.length ?
            list.map((item) => {
              return (
                <Product key={item.id} product={item} />
              )
            })
          : <Spin style={{marginTop: '150px'}} tip="Loading..." />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ products, loading })=>{
  return {
    list: products.list,
    loading: loading.models.products
  }
};

export default connect(mapStateToProps, null)(ProductsList);

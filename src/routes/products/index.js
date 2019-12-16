import React, {Component} from 'react';
import { connect } from 'dva';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart'
import { Badge, Icon } from 'antd';
import styles from './index.css';

class Products extends Component {
  constructor(){
    super();

    this.state = {
      drawerVisible: false
    }
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  }

  render(){
    const {drawerVisible} = this.state;

    return (
      <div className={styles.container}>
        <ProductsList />
        <Cart onClose={this.onClose} visible={drawerVisible} />
        <Badge className={styles.badge} count={this.props.counts} style={{ width: '20px', backgroundColor: 'gold', fontWeight: 'bold', fontSize: '12px'}} showZero offset={[-25, 35]}>
          <div className={styles.icon} onClick={this.showDrawer}>
            <Icon type="shopping-cart" />
          </div>
        </Badge>
      </div>
    );
  }
};

const mapStateToProps = ({ products })=>{
  return {
    counts: products.counts
  }
};

export default connect(mapStateToProps)(Products);

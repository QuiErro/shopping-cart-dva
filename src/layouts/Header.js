import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Menu, Icon } from 'antd';
import styles from './Header.css'

class Header extends Component {

    constructor(props) {
        super(props);
		
        this.state = {
            pathname: this.props.location.pathname
        };
    }
	
	changePage(e){
		this.setState({
			pathname: e.key
		});
	}
	
	render(){
		const {pathname} = this.state;
		return (
			<Menu
			  className={styles['menu-container']}
			  onClick={(e) => this.changePage(e)}
			  selectedKeys={[pathname]}
			  mode="horizontal"
			  theme="dark"
			>
			  <Menu.Item className={styles['menu-item']} key="/">
				<Link to="/"><Icon className={styles['menu-icon']} type="home" />Home</Link>
			  </Menu.Item>
			  <Menu.Item className={styles['menu-item']} key="/products">
				<Link to="/products"><Icon className={styles['menu-icon']} type="shop" />Products</Link>
			  </Menu.Item>
			  <Menu.Item className={styles['menu-item']} key="/dva">
				<a href="https://github.com/dvajs/dva" target="_blank" rel="noopener noreferrer">
				  <Icon className={styles['menu-icon']} type="api" />dva
				</a>
			  </Menu.Item>
			</Menu>
		)
	}
}

export default Header; 
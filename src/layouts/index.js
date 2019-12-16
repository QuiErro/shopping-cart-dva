import Header from './Header';
import styles from './index.css';

function Layouts(props) {
  return (
    <div className={styles.normal}>
      <Header location={props.location}/>
      {props.children}
    </div>
  );
}

export default Layouts;

import { Container } from "@material-ui/core";

import NavbarComponent from '../components/navbar_component';
import styles from '../styles/Components.module.css'

export default function LayoutComponent(props) {
    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Container className={styles.container}>
                {props.children}
            </Container>
        </div>
    );
}
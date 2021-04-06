import {Component} from 'react'
import {connect} from 'react-redux'
import * as authActions from '../../../store/actions/auth'
import * as burgerActions from '../../../store/actions/burgerStacker'

class Logout extends Component {
    render() {
        this.props.logout()
        this.props.initIngredients()
        this.props.history.push('/');
        
        return null
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
        initIngredients: () => dispatch(burgerActions.initIngredients())
    } 
}

export default connect(null, mapDispatchToProps)(Logout);
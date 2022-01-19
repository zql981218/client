import * as PropTypes from 'prop-types';
import './AuthorityButton.scss';
import { SessionContext } from "../../api/Application";
import EventUtils from "../../api/utils/EventUtils";
import IconUtils from "../../api/utils/IconUtils";
import { Component } from "react";
import { Button } from 'antd';
import I18NUtils from '../../api/utils/I18NUtils';

export default class AuthorityButton extends Component {

    type;
    icon;
    i18NCode;
    onClick;
    authorityName;
    className;
    /**
     * 后缀Icon
     */
    backIcon;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            disabled: true,
        }
    }

    getClassName() {
        const {className} = this.props;
        return className || "table-button";
    }

    handleClick = () => {
        this.setState({loading: false});
        const {onClick} = this.props;
        EventUtils.getEventEmitter().on(EventUtils.getEventNames().ButtonLoaded, () => this.setState({loading: false}));
        if (onClick) {
            onClick();
        }
    }

    getIcon = () => {
        const {icon} = this.props;
        return icon ? IconUtils.buildIcon(icon) : "";
    }

    componentDidMount = () => {
        //TODO 根据authoriytName去验证是否能用
        let {name} = this.props;
        if(!name){
            return;
        }
        let  scAuthorieties= SessionContext.getAuthorities();
        scAuthorieties.map((authorieties, index)=>{

            let scSubAuthorities = authorieties.subAuthorities;
            if (scSubAuthorities && scSubAuthorities.length > 0) {
                scSubAuthorities.map((subAuthorities, index)=>{

                    let scSubAuthority = subAuthorities.subAuthorities;
                    if (scSubAuthority && scSubAuthority.length > 0) {
                        scSubAuthority.map((subAuthority, index)=>{
        
                            if(subAuthority.authorityType == "B" && name == subAuthority.name){
                                this.state.disabled = false;
                            }
                        });
                    }
                });
            }
        });
    }

    render() {
        const {type, icon, i18NCode, name, size, style, href} = this.props;
        const {loading} = this.state;
        //this.props.disabled是否启动权限管理， true 启动，false|underfined 不启动
        const propsDisabled = this.props.disabled;
        const stateDisabled = this.state.disabled;
        let disabled = false;
        if (propsDisabled) {
            disabled = stateDisabled;
        }
        return <Button
                key={name}
                type={type || "primary"}
                className={this.getClassName()}
                icon={icon.startsWith("icon-") ? "": icon}
                disabled={disabled}
                size={size}
                style={style}
                href={href}
                loading={loading || false}
                onClick={() => this.handleClick()}
            >
            {icon.startsWith("icon-") ? IconUtils.buildIcon(icon): ""}
            {I18NUtils.getClientMessage(i18NCode)}
        </Button>
    }

}

AuthorityButton.prototypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    i18NCode: PropTypes.string
}
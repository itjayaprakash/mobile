import React, { Component } from 'react';
import { LoginService } from '../../services';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('user')) {
      this.props.history.push("/");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  login(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    LoginService.login(username, password).then(res => {

      localStorage.setItem('user',JSON.stringify({ username }));

      this.props.history.push('/');

    }, error => {
      alert(error);
    });

  }


  render() {
    const { username, password, submitted, error } = this.state;
    return (
      <div className="login_bg">
        <div className="mainWapper">
          <div className="top">
            <div className="logIn">

              <div className="log">
                <h3>Login</h3>
                <hr />
                <p><strong>Integrated Windows Authentication</strong></p>
                <p>With the Integrated Windows Authentication (IWA) you can use your Windows authentication to do an automatic login.</p>
              </div>

              <div className="LoginBoxTop">
                <div className="windowsImage">
                  <img className="golbalImage" src="https://b2econtent.bmwgroup.net/wui/common/img/iwa_icon_white.png" alt="windowsLogo" />
                </div>
                <div className="IWAbutton">
                  <button>IWA Login</button>
                </div>
              </div>

              <hr />

              <p><strong>Password Login</strong></p>
              <p>You can also login with your user name and password:</p>
          
              <div className="loginInput">
                <div className="userName">
                  <label htmlFor="user Name"> User Name / q-Number:</label>
                  <input id="userName" name="username" value={username} onChange={this.handleChange} ></input>

                  {submitted && !username &&
                    <span className="errormessage">UserName is required</span>
                  }
                </div>
                <div className="Password">
                  <label htmlFor="passWord"> Password:</label>
                  <input id="passWord" type="password" name="password" value={password} onChange={this.handleChange} ></input>

                  {submitted && !password &&
                    <span className="errormessage">Password is required</span>
                  }
                </div>
                <div className="LoginButton">
                  <button onClick={this.login}>Login</button>
                </div>
              </div>

              <div className="pass"></div>
            </div>
            <div className="helpWapper">
              <div className="help">
                <h3>Help</h3>
                <hr />
                <p><strong>NEW: Integrated Windows Authentication</strong></p>
                <p>With the Integrated Windows Authencation (IWA) you can automatically log on to the
                      portal or application without entering user name and password. Integrated Windows
                      Authentication uses Single Sign-On and your Windows log on. Alternatively, you can
                        use the regular log on with user name and password.</p>
                <p className="marginBottomZero">You forgot your password?</p>
                <span>Please click <a href="https://aspr.bmwgroup.net/bmwgroup/wizard/classic/start.jsp?language=en"
                  target="_blank">here</a>.</span>

                <p className="marginBottomZero">You have no password or it is expired?</p>
                <span>You can apply for a new password <a href="http://idas.muc" target="_blank">
                  here</a>.</span>

                <p className="marginBottomZero">You want to change your password?</p>
                <span>Please click <a href="https://aspr.bmwgroup.net/network/pwchange/step1.jsp?language=en"
                  target="_blank">here</a>.</span>



                <p className="marginBottomZero">You want to create or edit a secret question-answer pair, in
                                    case you forget your password?</p>
                <span>You can edit your 'Stored Knowledge'.<a href="https://aspr.bmwgroup.net/bmwgroup/initial/management.jsp?language=en"
                  target="_blank">here</a>.</span>



              </div>

            </div>
          </div>
          <div className="bottom">
            <div className="note">
              <h3>Note</h3>
              <hr />
              <p>Please do not save this page in your bookmarks/favorites.<br />
                If you want to save the requested page in your browser, please login first.</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

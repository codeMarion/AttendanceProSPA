import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../assets/school.svg";
import { useSpring, animated } from "react-spring";
import { Button } from "@material-ui/core";

const Login = () => {
  const calc = (x: number, y: number) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.1,
  ];
  const trans = (x: number, y: number, s: number) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  const Auth0 = useAuth0();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <div className="card-container">
      <animated.div
        className="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        //@ts-ignore
        style={{ transform: props.xys.interpolate(trans) }}
      >
        <div className="logo">
          <img src={Logo} alt="school" />
        </div>
        <div className="infoformation">
          <h1 className="title">
            <span style={{ color: "#39B6FF" }}>Attendance</span>
            <span style={{ color: "white" }}>Pro</span>
          </h1>
        </div>
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh'}}>
            <Button variant="contained" color="secondary" fullWidth style={{color: 'white', fontWeight: 'bold'}}
                onClick={() => Auth0.loginWithRedirect()}
            >
                LOGIN
            </Button>
        </div>
      </animated.div>
    </div>
  );
};

export default Login;

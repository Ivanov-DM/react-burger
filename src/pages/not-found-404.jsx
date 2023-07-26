import styles from "./not-found-404.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useNavigate } from "react-router";
import astronautImg from "../images/astronaut.svg";
import earthImg from "../images/earth.svg";
import moonImg from "../images/moon.svg";
import rocketImg from "../images/rocket.svg";

export const NotFound404 = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <>
      <div className={styles.stars}>
        <div className={styles.centralBody}>
          <p className={`${styles.text404} text text_type_main-large mb-10`}>
            404
          </p>
          <p className="text text_type_main-medium mb-20">
            УПС, ПОХОЖЕ ВАС УНЕСЛО В ОТКРЫТЫЙ КОСМОС
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => handleClick("/")}
          >
            СКОРЕЕ ДОМОЙ!
          </Button>
        </div>

        <div className={styles.objects}>
          <img className={styles.objectRocket} src={rocketImg} width="80px" />
          <div className={styles.earthMoon}>
            <img className={styles.objectEarth} src={earthImg} width="160px" />
            <img className={styles.objectMoon} src={moonImg} width="100px" />
          </div>
          <div className={styles.boxAstronaut}>
            <img
              className={styles.objectAstronaut}
              src={astronautImg}
              width="180px"
            />
          </div>
        </div>
        <div className={styles.glowingStars}>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
        </div>
      </div>
    </>
  );
};

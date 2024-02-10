import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { change_lang } from "../redux/LanguaSlicer";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Homepage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const dispatch = useDispatch();
  const langue = useSelector((state) => state.Langue.choice);

  function handleLangChange(e) {
    dispatch(change_lang(e.target.value));
  }

  return (
    <main className={styles.homepage}>
      <PageNav handleLangChange={handleLangChange} langue={langue} />

      <section>
        <div data-aos="zoom-in" data-aos-duration="2000">
          <h1>
            {langue === "ar" ? (
              <>
                <span>اعثر على وصفاتك المفضلة بنقرة واحدة.</span>
                <br />
                <span>مع ريسيبي</span>
              </>
            ) : (
              <>
                <span>Find your preferred recipes just by one click.</span>
                <br />
                <span>With Recepi</span>
              </>
            )}
          </h1>
          <h2>
            {langue === "ar" ? (
              <>
                <span>موقع يوفر لك أكثر من 1.000.000 وصفة ويوفر لك</span>
                <br />
                <span>إمكانية إضافة الوصفات إلى قائمة المفضلة ☘</span>
              </>
            ) : (
              <>
                <span>
                  A site that provides you with more than 1,000,000 recipes and
                  gives you the ability to add recipes to your bookmarks ☘
                </span>
              </>
            )}
          </h2>
          <NavLink to="search" className={styles.cta}>
            {langue === "ar" ? "ابدأ الآن !!" : "Start Now !!"}
          </NavLink>
        </div>
      </section>
    </main>
  );
}

function PageNav({ handleLangChange, langue }) {
  return (
    <nav className={styles.nav}>
      <Logo langue={langue} />
      <ul>
        <li>
          <a href="google.com">About us</a>
        </li>
        <li>
          <span>
            {langue === "ar"
              ? "اختر لغتك"
              : "Choose your language"}{" "}
          </span>
          <select name="" id="" value={langue} onChange={handleLangChange}>
            <option value="eng">English</option>
            <option value="ar">العربية</option>
          </select>{" "}
        </li>
      </ul>
    </nav>
  );
}

function Logo({ langue }) {
  return (
    <a href="google.com">
      <h3 className="text-3xl font-semibold tracking-widest font-mono">
        🥦 {langue === "ar" ? "ريسيبي" : "Recepi"}
      </h3>
    </a>
  );
}

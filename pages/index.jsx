import Head from "next/head";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { verifica } from "../services/user";
import { BiUserCircle } from "react-icons/Bi";
import { FaTractor } from "react-icons/Fa";

export default function Home() {
  const hadleClick = (e) => {
    e.preventDefault();
    // console.log("Clicou");
  };
  return (
    <div className="container">
      <div>
        <h1 class="title">Visão Geral</h1>
      </div>
      <div className="full">
        <div className="perfil">
          <div class="quadro">
            <div class="um"></div>
            <div class="dois">
              <icon class="icon_name">
                <BiUserCircle />
              </icon>
            </div>
            <div class="tres"></div>
          </div>
          <h2 class="person">Douglas Junior</h2>
          <div className="btn_1"></div>
          <div className="btn_2">
            <div className="menu">
              <ul className="list">
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    voce
                  </button>
                </li>
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    o mar
                  </button>
                </li>
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    e ela
                  </button>
                </li>
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    casa
                  </button>
                </li>
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    map
                  </button>
                </li>
                <li>
                  <button class="btn" type="submit" onClick={hadleClick}>
                    carro
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_3"></div>
        </div>
        <div class="icon_veiculo">
          <FaTractor />
        </div>
        <div class="resto">
          <span>Placa ABC-1234 - Uno Fire</span>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const token = getCookie("authorization", { req, res });
    if (!token) throw new Error("Token Invalido");

    verifica(token);
    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};

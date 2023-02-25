import Head from "next/head";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { verifica } from "../services/user";

export default function Home() {
  
  return (
      <div>
        <h2>Pagina Segura de Usuarios</h2>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckOutItems from "./CheckOutItems.js";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function CheckOut() {
  const [payment, setPayment] = useState({ name: "", cardNum: "" });
  const [address, setAddress] = useState({
    street: "",
    number: "",
    district: "",
    city: "",
    stateUF: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const [userCart, setUserCart] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const { user, setUser } = React.useContext(UserContext);
  const [load, setLoad] = React.useState(true);
  let config = "";
  if (user) {
    config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }

  React.useEffect(() => {
    const promise = axios.get(
      `https://divinoverde-back.herokuapp.com/cart`,
      config
    );
    promise.then((res) => {
      setTotal(res.data.total);
      setUserCart(res.data.userData);
      setLoad(false);
    });
    promise.catch(() => setLoad(false));
  }, []);

  function loadItems() {
    if (!user || !userCart) {
      return <>vazio</>;
    }
    return (
      <>
        {userCart.map((e, index) => {
          return (
            <CheckOutItems
              user={user}
              userCart={userCart}
              userCartIndex={e}
              key={index}
            />
          );
        })}
      </>
    );
  }

  const [blockEdit, setBlockEdit] = useState({
    address: false,
    payment: false,
  });

  const navigate = useNavigate();

  function paymentBlock(e) {
    e.preventDefault();

    setBlockEdit({ ...blockEdit, payment: true });
    setShowAddress(true);
    setShowPayment(false);
  }

  function addressBlock(e) {
    e.preventDefault();

    setBlockEdit({ ...blockEdit, address: true });
    setShowAddress(false);
  }

  function finishOrder() {
    const order = {
      ...userCart,
    };
    const promise = axios.post(
      "https://divinoverde-back.herokuapp.com/finish",
      order,
      config
    );
    promise.then(() => navigate("/success"));
  }

  return (
    <Container>
      <Top showPayment={showPayment} showAddress={showAddress}>
        <h2>Checkout</h2>
        <h5>Itens:</h5>
        {load ? <TailSpin /> : loadItems()}

        <h4>Valor total = R${total.toFixed(2).replace(".", ",")}</h4>
        <h3
          onClick={() => {
            setShowAddress(false);
            setShowPayment(!showPayment);
          }}
        >
          Pagamento
        </h3>
        <Payment showPayment={showPayment}>
          <form onSubmit={paymentBlock}>
            <OneInputLine>
              <label htmlFor="name">Nome: </label>
              <input
                type="text"
                id="name"
                value={payment.name}
                minLength={3}
                maxLength={50}
                disabled={blockEdit.payment}
                onChange={(e) =>
                  setPayment({ ...payment, name: e.target.value })
                }
                required
              />
            </OneInputLine>
            <OneInputLine>
              <label htmlFor="card-number">Número do cartão: </label>
              <input
                type="tel"
                id="card-number"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                placeholder="xxxx xxxx xxxx xxxx"
                value={payment.cardNum}
                disabled={blockEdit.payment}
                onChange={(e) =>
                  setPayment({ ...payment, cardNum: e.target.value })
                }
                required
              />
            </OneInputLine>
            <PaymentButtons payment={blockEdit.payment}>
              <button
                disabled={!blockEdit.payment}
                onClick={() => setBlockEdit({ ...blockEdit, payment: false })}
              >
                Editar
              </button>
              <button disabled={blockEdit.payment} type="submit">
                Confirmar
              </button>
            </PaymentButtons>
          </form>
        </Payment>
        <h3
          onClick={() => {
            setShowPayment(false);
            setShowAddress(!showAddress);
          }}
        >
          Endereço
        </h3>
        <Address showAddress={showAddress}>
          <form onSubmit={addressBlock}>
            <TwoInputsLine>
              <label htmlFor="street">Rua: </label>
              <input
                type="text"
                id="street"
                value={address.street}
                minLength={2}
                maxLength={50}
                disabled={blockEdit.address}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
              />
              <label htmlFor="number">Nº: </label>
              <input
                type="number"
                id="number"
                value={address.number}
                minLength={1}
                maxLength={5}
                disabled={blockEdit.address}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
                required
              />
            </TwoInputsLine>
            <OneInputLine>
              <label htmlFor="district">Bairro: </label>
              <input
                type="text"
                id="district"
                value={address.district}
                minLength={3}
                maxLength={50}
                disabled={blockEdit.address}
                onChange={(e) =>
                  setAddress({ ...address, district: e.target.value })
                }
                required
              />
            </OneInputLine>
            <TwoInputsLine>
              <label htmlFor="city">Cidade: </label>
              <input
                type="text"
                id="city"
                value={address.city}
                minLength={3}
                maxLength={50}
                disabled={blockEdit.address}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
              <label htmlFor="state">UF: </label>
              <input
                type="text"
                id="state"
                value={address.stateUF}
                minLength={2}
                maxLength={2}
                disabled={blockEdit.address}
                onChange={(e) =>
                  setAddress({ ...address, stateUF: e.target.value })
                }
                required
              />
            </TwoInputsLine>
            <AddressButtons address={blockEdit.address}>
              <button
                disabled={!blockEdit.address}
                onClick={() => setBlockEdit({ ...blockEdit, address: false })}
              >
                Editar
              </button>
              <button disabled={blockEdit.address} type="submit">
                Confirmar
              </button>
            </AddressButtons>
          </form>
        </Address>
      </Top>
      <Bottom address={blockEdit.address} payment={blockEdit.payment}>
        <button
          disabled={!(blockEdit.address && blockEdit.payment)}
          onClick={() => finishOrder()}
        >
          Fechar Compra
        </button>
        <button onClick={() => navigate("/")}>Cancelar</button>
      </Bottom>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 85vh;
  padding: 0 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: 700;

    width: 100%;
    margin-top: 26px;
  }

  h5 {
    font-size: 15px;
    font-weight: 600;

    width: 100%;
    margin-top: 13px;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;

    width: 100%;
    margin: 25px 0;

    text-align: right;
  }

  h3 {
    background-color: #72ab97;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;

    width: 100%;
    max-width: 766px;
    margin-top: 8px;
    padding: 8px;
  }

  h3:first-of-type {
    border-radius: ${({ showPayment }) =>
      showPayment ? "5px 5px 0 0" : "5px"};
  }

  h3:last-of-type {
    border-radius: ${({ showAddress }) =>
      showAddress ? "5px 5px 0 0" : "5px"};
  }
`;

const Payment = styled.div`
  background-color: #f1f4f1;
  border-radius: 0 0 5px 5px;
  display: ${({ showPayment }) => (showPayment ? "inherit" : "none")};

  width: 100%;
  max-width: 766px;
  padding: 8px;

  form {
    width: 100%;
  }
`;

const Address = styled.div`
  background-color: #f1f4f1;
  border-radius: 0 0 5px 5px;
  display: ${({ showAddress }) => (showAddress ? "inherit" : "none")};

  width: 100%;
  max-width: 766px;
  padding: 8px;

  form {
    width: 100%;
  }
`;

const TwoInputsLine = styled.div`
  width: 100%;
  max-width: 750px;
  display: flex;
  align-items: center;

  label {
    font-weight: 600;

    margin-right: 5px;
  }

  input {
    background-color: #d9d9d9;
    border: none;
    outline: none;

    width: 100%;
    margin-bottom: 5px;
    margin-right: 8px;
    padding: 5px;
  }

  input:nth-last-of-type(1) {
    width: 60px;
  }
`;

const OneInputLine = styled.div`
  width: 100%;
  max-width: 750px;
  display: flex;
  align-items: center;

  label {
    font-weight: 600;

    margin-right: 5px;
  }

  input {
    background-color: #d9d9d9;
    border: none;
    outline: none;

    width: 100%;
    margin-bottom: 5px;
    margin-right: 8px;
    padding: 5px;
  }
`;

const PaymentButtons = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  button {
    background-color: #e99baf;
    border: none;
    border-radius: 5px;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;

    width: 100px;
    margin-top: 10px;
    margin-right: 5px;
    padding: 5px 8px;
  }

  button:first-of-type {
    background-color: ${({ payment }) => (payment ? "#E99BAF" : "#A7A7A7")};
    cursor: ${({ payment }) => (payment ? "pointer" : "initial")};
  }

  button:last-of-type {
    background-color: ${({ payment }) => (!payment ? "#E99BAF" : "#A7A7A7")};
    cursor: ${({ payment }) => (!payment ? "pointer" : "initial")};
  }
`;

const AddressButtons = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  button {
    background-color: #e99baf;
    border: none;
    border-radius: 5px;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;

    width: 100px;
    margin-top: 10px;
    margin-right: 5px;
    padding: 5px 8px;
  }

  button:first-of-type {
    background-color: ${({ address }) => (address ? "#E99BAF" : "#A7A7A7")};
    cursor: ${({ address }) => (address ? "pointer" : "initial")};
  }

  button:last-of-type {
    background-color: ${({ address }) => (!address ? "#E99BAF" : "#A7A7A7")};
    cursor: ${({ address }) => (!address ? "pointer" : "initial")};
  }
`;

const Bottom = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    font-size: 18px;
    font-weight: 700;
    border: none;
    outline: none;
  }

  button:first-of-type {
    background-color: #e99baf;
    color: #ffffff;

    background-color: ${({ address, payment }) =>
      address && payment ? "#E99BAF" : "#A7A7A7"};
    color: #ffffff;

    border-radius: 5px;
    cursor: ${({ address, payment }) =>
      address && payment ? "pointer" : "initial"};

    width: 170px;
    height: 35px;
    margin-top: 25px;
  }

  button:last-of-type {
    background-color: #ffffff;
    color: #a7a7a7;

    background-color: #ffffff;
    color: #a7a7a7;
    cursor: pointer;

    margin-top: 8px;
  }
`;

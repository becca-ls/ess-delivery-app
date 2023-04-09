import { useContext, useState, useEffect } from "react";

import { Header } from "../components/header/Header";
import { Links } from "../components/links/Links";
import { CreateProduct } from "./createProduct/CreateProduct";
import { EditProduct } from "./editProduct/EditProduct";
import { AuthContext } from "../../context/auth";

import './Products.css';

import plus from "./assets/Plus.png"
import magnifyingGlass from "./assets/magnifying-glass.png"
import nothingHere from "./assets/nadaAqui.png"

export const Products = () => {
  // ISSO AQUI TUDINHO TEM QUE AJEITAR (É SÓ O CÓDIGO DO DE RENATO, SÓ QUE COM OS NOMES TROCADOS. PRECISA CRIAR O SERVICES, O TYPES E ADAPTAR. ALÉM DISSO, FAZER O MESMO EM EDITPRODUCT E CREATEPRODUCT, QUE TEM QUE PEGAR AS CATEGORIES)

  // const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  // const [feedback, setFeedback] = useState("");
  // const [error, setError] = useState(false);
  // const [item, setItem] = useState<Item[]>([]);
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  // const { user } = useContext(AuthContext);
  // const categoryService = new CategoryService(user!.token!);

  // const createHandler = async (id: number, data: AddItem) => {
  //   setLoading(true);
  //   let response: any = null;

  //   try {
  //     response = await itemService.update(id, data);
  //     setFeedback(response.message);
  //     if (response.errorType) setError(true);
  //   } catch (e) {
  //     setFeedback(response.message);
  //     setError(true);
  //   }
    
  //   getItem();
  //   setLoading(false);
  // };

  // const updateHandler = async (id: number, data: Partial<AddItem>) => {
  //   setLoading(true);
  //   let response: any = null;

  //   try {
  //     response = await categoryService.update(id, data);
  //     setFeedback(response.message);
  //     if (response.errorType) setError(true);

  //     setItem(() => {
  //       const index = item.findIndex((cat) => cat.id === id);
  //       const newItem = [...item];
  //       newItem[index] = { ...newItem[index], ...data };
  //       setSelectedId(null);
  //       return newItem;
  //     });
  //   } catch (e) {
  //     setFeedback(response.message);
  //     setError(true);
  //   }

  //   setLoading(false);
  // };

  // const deleteHandler = async (id: number) => {
  //   setLoading(true);
  //   let response: any = null;

  //   try {
  //     response = await itemService.delete(id);
  //     setFeedback(response.message);
  //     if (response.errorType) setError(true);
  //     setItem(() => {
  //       return item.filter((cat) => cat.id !== id);
  //     });
  //   } catch (e) {
  //     setFeedback(response.message);
  //     setError(true);
  //   }

  //   setLoading(false);
  // };

  // --------------------------------------------------------------------------------- //
  // DAQUI PARA BAIXO É A FUNÇÃO QUE ESCOLHE ENTRE CRIAR UM NOVO ITEM E EDITAR UM ITEM //
  // --------------------------------------------------------------------------------- //

  // let selected = false;

  // function isSelected() {
  //   selected = true;
  // }

  // function callCreateItem() {
  //   if(selected === true) {
  //     return (
  //       <CreateProduct />
  //     )
  //   }
  // }

  // function callEditItem() {
  //   if (selectedId) {
  //     selected = false;
  //     return (
  //       <EditProduct
  //         updateHandler={updateHandler}
  //         deleteHandler={deleteHandler}
  //         item={item.find(cat => cat.id === selectedId)}
  //       />
  //     )
  //   }
  // }

  // function tradeFromProducts() {
  //   if (selected === true){
  //     return (callCreateItem());
  //   }
  //   else {
  //     return (callEditItem());
  //   }
  // }

  return (
    <div>
      <Header />
      <Links />
      <div className="products-main-div">
        <div className="products-box">
          <div className="products-left-col">
            <div className="products-left-header">
              <div className="products-left-header-first-line">
                <h2>Produtos</h2>
                <button><img src={plus}/></button>
              </div>
              <div className="products-line"/>
            </div>
            <div className="products-search-bar">
              <input type="text">
              </input>
              <button><img src={magnifyingGlass}/></button>
            </div>
            <div className="products">
              {/* Isso aqui já tá tudo certo */}

              {/* {search
                ? item
                    .filter((cat) => cat.name.includes(search))
                    .map((cat) =>
                      <div 
                        className="product-div" 
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          padding: "10px 0 10px 0",
                          borderBottom: "2px var(--Gray)"
                        }}
                      >
                        <div className="product-div-left">
                          <img src={cat.picture}/>
                        </div>

                        <div className="product-div-right">
                          <h3 style={{
                            color: "var(--Purple-Primary)",
                            padding: "2px 0 0 0",
                          }}>
                            {cat.name}
                          </h3>
                          <h3 style={{
                            color: "#000000",
                            padding: "2px 0 0 0",
                          }}>
                            {cat.price}
                          </h3>
                        </div>
                      </div>
                    )
                : item.map((cat) => 
                  <h4 style={{
                    color: "var(--Purple-Primary)",
                    padding: "10px 0 10px 0",
                    borderBottom: "2px var(--Gray)"
                  }}>
                    {cat.name}
                  </h4>
                )
              } */}
            </div>
          </div>

          <div className="products-middle-line"/>

          <div className="products-right-col">
            {/* { 
              tradeFromProducts()
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};
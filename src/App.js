import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button, Row, Col } from "react-bootstrap";
/*
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
*/
import "./App.css";
// css를 제공해주는 사이트 : bootstrap
// npm install react-bootstrap bootstrap

//자바스크립트 파일은 확장자명을 생략(.js 안붙임)
//다른 자바스크립트에서 export 한건 import로 가져와서 사용(변수처럼 사용)
//여러건을 가지고 올때는 중괄호('{}') 사용
import data from "./data";
import { num1, num2, num3 } from "./data";

//이미지를 사용하려며 import 개당 하나씩
//mainBG이라는 이름이로 main.jpg사용
import mainBG from "./main.jpg";
import DetailPage from "../src/pages/Detail";
import { Routes, Route, useNavigate, Outlet, Link } from "react-router-dom";
//라우터는 창을 새로 불러오는게 아니라 재렌더링 방식을 사용(빠름)

function App() {
  let [items, setitems] = useState(data);//data는 변수니깐 state로 (data->items)
  let [photo, setPhoto] = useState(["/shop1.jpg", "/shop2.jpg", "/shop3.jpg","/shop4.jpg"]);
  let colCnt = 4;
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* href는 화면을 다시 보여주지만 navigate는 렌더링한 부분만 변경 */}
          <Navbar.Brand href="#home">
            <img src={"/logo.png"} width={"50px"} height={"50px"} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              상세페이지
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(1);
              }}
            >
              앞으로가기
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <br/>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container>
                <Row>
                  {/* items 배열을 3개의 열로 나누어 렌더링 */}
                  {items
                    .reduce((rows, item, index) => {
                      if (index % colCnt === 0) rows.push([]);
                      rows[rows.length - 1].push(item);
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <Row key={rowIndex}>
                        {row.map((item, colIndex) => (
                          <Col key={colIndex} md={4}>
                            <ItemCol data={item} img={photo[colIndex]} />
                          </Col>
                        ))}
                      </Row>
                    ))}
                </Row>
              </Container>
            </>
          }
        ></Route>
        {/* 
          :id    =>  URL파라미터(변수)를 통해서 상세아이템 변경
        */}
        <Route path="/detail/:id" element={<DetailPage items={items} img={photo}/>}></Route>
        {/* <Route path="/detail/0" element={<DetailPage items={items} id={0} img={photo}/>}></Route>
        <Route path="/detail/1" element={<DetailPage items={items} id={1} img={photo}/>}></Route>
        <Route path="/detail/2" element={<DetailPage items={items} id={2} img={photo}/>}></Route> */}
        <Route path="/about" element={<AboutPage />}>
          <Route path="address" element={<div>주소</div>}></Route>
          <Route path="location" element={<div>위치</div>}></Route>
        </Route>
        <Route
          path="/about/member"
          element={<div>어바웃 멤버페이지</div>}
        ></Route>
        <Route path="*" element={<div>그외페이지(404)</div>}></Route>
      </Routes>
      <br/>
      {/* 
          리액트는 하나의 html을 다시 그리는 방식이기 때문에
          html을 이동하는 <a>태그 보다는 리액트 라우터의 <Link>를 사용 
      */}
      <Link to="/about/address"><Button variant="warning">리액트 부트스트랩 버튼</Button>{" "}</Link>
      {/* 
                    {items.map((item, index) => (
                      <ItemCol key={index} data={item} img={photo[index]} />
                    ))}
        
        <Row>
          data갯수와 image가 바뀔수 있으므로 useState 처리 

          <ItemCol data={items[0]} img={photo[0]} />
          <ItemCol data={items[1]} img={photo[1]} />
          <ItemCol data={items[2]} img={photo[2]} />
        </Row>         */}
      {/* <div style={{
        //backgroundImage:`url(${mainBG})`, 
        backgroundImage: 'url(/shop1.jpg',
        height:'100px',
        backgroundSize:'cover',
        backgroundPosition:'center'}}>
      </div> */}
 
    </div>
  );
}

export default App;

//컴포넌트는 맨 앞글자는 대문자
//return에 html(jsx) 코드 입력
function ItemCol(props) {
  const Clicklog = () => {
    console.log(props.data.id);
    

  }
  //사용하는 곳에서 결정해줘야하는 부분(바뀌어야할 부분)만 props처리
  return (
    <>
      <Col>
        <img 
          src={props.img} 
          width={"200px"} 
          height={"200px"} 
          onClick={Clicklog}
        />
        <h4>{props.data.title}</h4>
        <p>{props.data.price}원</p>
      </Col>
    </>
  );
}

//어바웃컴포넌트 페이지
function AboutPage() {
  return (
    <>
      <div>
        <h4>어바웃 페이지</h4>
        {/* Outlet으로 중첩 Route의 위치를 결정 */}
        <Outlet />
      </div>
    </>
  );
}

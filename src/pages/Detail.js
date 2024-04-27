import { Container, Row, Col, Button } from 'react-bootstrap'
import './Detail.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function DetailPage(props){
  //컴포넌트는 return으로 화면을 그린다.
  //URL파라미터를 useParams()로 받는다(상세페이지 id번호) 0,1,2
  let {id} = useParams()   //URL파라미터 가져오기
  //선택된 아이템인지 식별(items의 id와 URL파라미터의 id가 같은지 검사)
  let seletedItem = props.items.find((e)=>{
    //items의 id와 URL파라미터의 id가 같은지 검사
    return e.id == id
  })

  let [hideDom, setHideDom] = useState(false);

  //useEffect : 오래걸리는 작업을 처리할때
  //리액트의 컴포넌트 라이프사이클(생성, 갱신, 없어질떄) : 각 라이프사이클마다 코드를 실행
  //mount: 생성 / update: 갱신 / unmount: 없어질때
  useEffect(()=>{
    //mount와 update시에 실행될 코드
    //html을 먼저 보여주고 오래 걸리는 작업을 처리(서버요청 등..)
    console.log('mount 첫실행');

    setTimeout(()=>{
      setHideDom(true);
    }, 2000)

    setTimeout(()=>{
      console.log('3')
    }, 3000)
    //unmount에 대해서는 return에 작성
    return(()=>{
      console.log('unmount');
    })
  })
  return(
    <Container>
      {
        hideDom === false ? (
            <div>
              hello
            </div>
        )
        : null 
      }
      <Row>
        <Col>
          <img src= {props.img[seletedItem.id]}  width={'400px'} height={'300px'}/>
        </Col>
        <Col>
          <h4>{seletedItem.title}</h4>
          <p>{seletedItem.content}</p>
          <p>{seletedItem.price}</p>
          <Button>주문하기</Button>
        </Col>
      </Row>

    </Container>  
  )
}
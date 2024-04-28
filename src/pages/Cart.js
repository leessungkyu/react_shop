import {Table, Button} from 'react-bootstrap'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { chageData } from '../store';

//Cart로 이동하면 보여줄 컴포넌트
export default function Cart(){
  //등록된 슬라이스를 store에서 가져다 쓴다(리덕스)
  let slice1 = useSelector((state)=>{return state});
  console.log(slice1.slice1);

  let data = useSelector((state)=>{return state.slice2});
  console.log(data);

  //리덕스 슬라이스 변경 기능 변수화
  let dispatch = useDispatch();
  console.log(slice1.slice1);

  return(
    <div>
        {/* <Button
          onClick={()=>{dispatch(chageData())}} //슬라이스1 변경 함수
        >슬라이스1 변경</Button> */}
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>설명</th>
              <th>수량</th>
              <th>추가</th>
            </tr>
          </thead>
          <tbody>
            {/* 반복문을 통해 데이터를 기준으로  출력 */}
            {
              data.map((item, idx)=>{
                return(
                  <>
                    <tr>
                      <td>{idx+1}</td>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>1</td>
                      <td><Button>+</Button></td>
                    </tr>
                  </>
                )
              })
            }

   
          </tbody>
        </Table>
    </div>
  )
}
let data = [
  {
    id:0,
    title:'상품1',
    content:'상품1설명',
    price: 10000
  },
  {
    id:1,
    title:'상품2',
    content:'상품2설명',
    price: 20000
  },
  {
    id:2,
    title:'상품3',
    content:'상품3설명',
    price: 30000
  }
]
let num1 = 1;
let num2 = 2;
let num3 = 3;


//default는 하나만 내보내기 가능
export default data;
//추가로 내보내기
export {num1, num2, num3};
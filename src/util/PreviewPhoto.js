const PreviewPhoto = async (files) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(files);
  });
};
export default PreviewPhoto;

// 기존에 이미지 미리보기의 코드가 여러군데에 사용이되었지만
// 함수를 분리해서 여러군데에 깨끗하게 사용하진 못했었으나
// 이번에 커리어리에서 도움을받고 분리하는데 성공했다.

// Promise로 Promise객체로 만들어준 뒤 사용을하면 나중에 사용할 다른 컴포넌트에서
// async/await으로 파일을 받아올 수 있다.(여기서는 URL데이터),
// Promise에 대해서는 잘 몰랐는데 이번에 더 검색하고 공부해봐야겠다.

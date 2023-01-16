import { storage } from "../index";

const StorageUpload = (PhotoPath, PhotoName, Photo) => {
  const storageRef = storage.ref();
  const storagePath = storageRef.child(`${PhotoPath}` + `${PhotoName}`);
  const storageUploading = storagePath.put(Photo);
  return new Promise((resolve, reject) => {
    storageUploading.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      () => {
        storageUploading.snapshot.ref.getDownloadURL().then((url) => {
          resolve(url);
        });
      }
    );
  });
};

export default StorageUpload;

// 여기 또한 이미지업로드를 자주하는데 코드가 지저분해 분리해주고싶었던 함수
// 여기도 마찬가지로 커리어리에서 도움을받아서 작성됐다.

// 이 또한 이미지 미리보기처럼 Promise를 사용해서 그 결과값을 출력해내는방식인데
// Promise가 굉장히 유용하다는걸 알았다.

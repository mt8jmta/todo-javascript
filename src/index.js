import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値取得、初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  // 未完了エリアに移動
  createIncompletedList(inputText);
};

// 完了or未完了リストから指定の要素を削除
const deleteFromList = (target, list) => {
  const deleteTarget = target;
  document.getElementById(list).removeChild(deleteTarget);
};

// 完了リストに追加する要素作成
const createIncompletedList = (innerText) => {
  // div作成
  const div = document.createElement("div");
  div.className = "list-row";

  // li作成
  const li = document.createElement("li");
  li.innerText = innerText;

  // button(完了)作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親要素(div)を削除
    deleteFromList(completeButton.parentNode, "incompleted-list");

    // 押された完了ボタンの内容を完了リストに追加
    const completeDiv = document.createElement("div");
    completeDiv.className = "list-row";
    // li作成
    const completeText = completeButton.parentNode.getElementsByTagName("li")[0]
      .innerText;
    const completeLi = document.createElement("li");
    completeLi.innerText = completeText;

    // button(戻す)作成
    const putBackButton = document.createElement("button");
    putBackButton.innerText = "戻す";
    putBackButton.addEventListener("click", () => {
      // テキスト取得
      const putBackText = completeButton.parentNode.getElementsByTagName(
        "li"
      )[0].innerText;
      // 押された戻すボタンの親要素(div)を削除
      deleteFromList(putBackButton.parentNode, "completed-list");
      // 未完了エリアに移動
      createIncompletedList(putBackText);
    });

    // completeDivの子要素設定
    completeDiv.appendChild(completeLi);
    completeDiv.appendChild(putBackButton);
    // 完了リストエリアに追加
    document.getElementById("completed-list").appendChild(completeDiv);
    return;
  });

  // button(削除)作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親要素(div)を削除
    deleteFromList(deleteButton.parentNode, "incompleted-list");
  });
  // divの子要素設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストエリアに追加
  document.getElementById("incompleted-list").appendChild(div);
  return;
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

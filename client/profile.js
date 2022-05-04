import * as crud from "./crud.js"

const oldPassword_input = document.getElementById("old-password");
const newPassword1_input = document.getElementById("new-password-1");
const newPassword2_input = document.getElementById("new-password-2");
const submit_btn = document.getElementById("change-password");
const deleteProfile_btn = document.getElementById("delete-btn");

newPassword2_input.addEventListener('keyup', (e) => {
  if (newPassword1_input.value === newPassword2_input.value){
    newPassword2_input.style.backgroundColor = 'green';
    newPassword2_input.style.color = 'black';
  } else{
    newPassword2_input.style.backgroundColor = 'red';
    newPassword2_input.style.color = 'black';
  }
});

submit_btn.addEventListener('click', async() =>{
  const data = await crud.updateUser(oldPassword_input.value, newPassword1_input.value);
  alert(data.status);
});

deleteProfile_btn.addEventListener('click', async() => {
  const data = await crud.deleteUser();
  (data.status === 'success')? alert('Your profile has been deleted.'): alert(`error: ${data.status}`);
})
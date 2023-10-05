export const inputTag = (tagValue) => {
  return {
    type: "input_tag",
    payload: tagValue,
  };
};
export const addTag = (tag) => {
  return {
    type: "add_tag",
    payload: tag
  };
};
export const deleteTag = (index) => {
  return {
    type: 'delete_tag',
    payload: index,
  };
};
export const deleteAll = () =>{
  return {
    type: 'delete_all'
  }
}

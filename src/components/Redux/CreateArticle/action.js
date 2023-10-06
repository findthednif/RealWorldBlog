export const inputTag = (tagValue) => ({
  type: 'input_tag',
  payload: tagValue,
});
export const addTag = (tag) => ({
  type: 'add_tag',
  payload: tag,
});
export const deleteTag = (index) => ({
  type: 'delete_tag',
  payload: index,
});
export const deleteAll = () => ({
  type: 'delete_all',
});

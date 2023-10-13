const userToken = () => JSON.parse(localStorage.getItem('token'));
const url = 'https://blog.kata.academy/api/';
export const getGlobalArticles = async (offset) => {
  const fetchParams = {
    headers: {
      Authorization: `Token ${userToken()}`,
    },
  };
  const responce = await fetch(
    `${url}articles?limit=5&offset=${offset}`,
    fetchParams,
  );
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  throw new Error(`getGlobalArticles fetch failed, ${responce.status}`);
};
export const getArticle = async (slug) => {
  const fetchParams = {
    headers: {
      Authorization: `Token ${userToken()}`,
    },
  };
  const responce = await fetch(`${url}articles/${slug}`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  throw new Error(`getArticle fetch failed, ${responce.status}`);
};
export const registerUser = async (userData) => {
  const fetchParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}users`, fetchParams);
  const data = await responce.json();
  console.log(data);
  if (responce.ok) {
    return data;
  }
  const error = new Error(`registerUser fetch failed, ${responce.status}`);
  error.status = responce.status;
  error.messages = data.errors;
  throw error;
};
export const loginUser = async (userData) => {
  const fetchParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}users/login`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  const error = new Error(`loginUser fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const getUser = async () => {
  const fetchParams = {
    headers: {
      Authorization: `Token ${userToken()}`,
    },
  };
  const responce = await fetch(`${url}user`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  throw new Error(`getUser fetch failed, ${responce.status}`);
};
export const editUser = async (userData) => {
  const fetchParams = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${userToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };
  const responce = await fetch(`${url}user`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  const error = new Error(`editUser fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const createArticle = async (articleData) => {
  const fetchParams = {
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  };
  const responce = await fetch(`${url}articles`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  const error = new Error(`createArticle fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const editArticle = async (articleData, slug) => {
  const fetchParams = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${userToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  };
  const responce = await fetch(`${url}articles/${slug}`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  const error = new Error(`editArticle fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const deleteArticle = async (slug) => {
  const fetchParams = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken()}`,
    },
  };
  const responce = await fetch(`${url}articles/${slug}`, fetchParams);
  if (responce.ok) {
    return responce;
  }
  const error = new Error(`deleteArticle fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const favoriteArticle = async (slug) => {
  const fetchParams = {
    method: 'POST',
    headers: {
      Authorization: `Token ${userToken()}`,
      'Content-Type': 'application/json',
    },
  };
  const responce = await fetch(`${url}articles/${slug}/favorite`, fetchParams);
  if (responce.ok) {
    const data = await responce.json();
    return data;
  }
  const error = new Error(`favoriteArticle fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};
export const unFavoriteArticle = async (slug) => {
  const fetchParams = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${userToken()}`,
    },
  };
  const responce = await fetch(`${url}articles/${slug}/favorite`, fetchParams);
  if (responce.ok) {
    return responce;
  }
  const error = new Error(`deleteArticle fetch failed, ${responce.status}`);
  error.status = responce.status;
  throw error;
};

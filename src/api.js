const BASE_URL = "https://www.anapioficeandfire.com/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const fetchCharacters = async (page = 1, pageSize = 10) => {
  const response = await fetch(`${BASE_URL}/characters?page=${page}&pageSize=${pageSize}`);
  return handleResponse(response);
};

export const fetchCharacterById = async (id) => {
  const response = await fetch(`${BASE_URL}/characters/${id}`);
  return handleResponse(response);
};

export const fetchHouses = async (page = 1, pageSize = 10) => {
  const response = await fetch(`${BASE_URL}/houses?page=${page}&pageSize=${pageSize}`);
  return handleResponse(response);
};

export const fetchBooks = async (page = 1, pageSize = 10) => {
  const response = await fetch(`${BASE_URL}/books?page=${page}&pageSize=${pageSize}`);
  return handleResponse(response);
};

export const searchCharacters = async (name, page = 1, pageSize = 10) => {
  const encodedName = encodeURIComponent(name);
  const response = await fetch(`${BASE_URL}/characters?name=${encodedName}&page=${page}&pageSize=${pageSize}`);
  return handleResponse(response);
};
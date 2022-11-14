import {
  useContext,
  useState,
} from 'react';

import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryListViewModel = () => {

    const [responseMessage, setResponseMessage] = useState('');
    const { categories, getCategories, remove } = useContext( CategoryContext );


    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory);
        setResponseMessage(result.message);
    }

    return {
        categories,
        responseMessage,
        getCategories,
        deleteCategory
    }
}

export default AdminCategoryListViewModel;
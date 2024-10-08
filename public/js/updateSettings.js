import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword/'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated succesfully`);
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ERR_NETWORK') {
        showAlert('error', 'Network error. Please check your connection.');
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        showAlert('error', err.response.data.message);
      } else {
        showAlert('error', 'An error occurred while updating settings.');
      }
    } else {
      showAlert('error', 'Something went wrong!');
    }
  }
};

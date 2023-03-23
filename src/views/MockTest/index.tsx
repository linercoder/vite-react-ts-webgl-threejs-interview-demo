import type { UserInfoResponse } from '@/api/mock/user';

import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { delUserInfoApi, postUserInfoApi, putUserInfoApi, getUserInfoApi } from '@/api/mock/user';

const MockTest = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse>();

  useAsyncEffect(async () => {
    const res = await getUserInfoApi({ id: '1' });
    setUserInfo(res.data);
  }, []);

  const handleDelUserInfo = async () => {
    await delUserInfoApi({ id: '1' });
  };

  const handleAddUserInfo = async () => {
    await postUserInfoApi({ id: '1', name: 'k先生' });
  };

  const handlePutUserInfo = async () => {
    await putUserInfoApi({ id: '1', name: 'k先生' });
  };

  return (
    <div className="mock-test-wrapper">
      <div>
        信息展示：{userInfo?.age} {userInfo?.name}
      </div>
      <button onClick={handleAddUserInfo}>新增</button>
      <button onClick={handleDelUserInfo}>删除</button>
      <button onClick={handlePutUserInfo}>编辑</button>
    </div>
  );
};

export default MockTest;

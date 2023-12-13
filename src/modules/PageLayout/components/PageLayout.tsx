import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';

import { menuList } from '../../../constants';
import { CopyrightOutlined } from '@ant-design/icons';

import AddPostForm from '../../PostManagement/components/AddPostForm';
import Posts from '../../PostManagement/components/Posts';
import TodosList from '../../TodosList/components/TodosList';
import UsersList from '../../usersList/components/UsersList';

const { Header, Content, Footer } = Layout;

const components = [<UsersList />, <Posts />, <AddPostForm />, <TodosList />];

const items = menuList.map((item, index) => ({
  key: index + 1,
  label: item,
  content: components[index],
}));

const PageLayout: React.FC = () => {
  const [current, setCurrent] = useState(['1']);
  const [page, setPage] = useState(components[0]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClickMenu = (e: any) => {
    console.log('click ', e);
    console.log(items[e.key]);
    setPage(items[e.key - 1].content);
    setCurrent(e.key);
  };
  console.log(current);
  return (
    <Layout style={{ minHeight: '100vh', }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={onClickMenu}
        />
      </Header>
      <Content style={{ display: 'flex', flexDirection: 'column', padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          {page}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <CopyrightOutlined />{' '}made by Pylko Nataliia</Footer>
    </Layout>
  );
};

export default PageLayout;

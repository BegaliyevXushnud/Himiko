import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, useLocation,Outlet } from 'react-router-dom';
import admin from "../../router/routes";
import LogoImg from "../../assets/h.png"; 
const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState("");
  const { pathname } = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  useEffect(() => {
    let index = admin.findIndex((item) => item.path === pathname);
   if(index !== -1){
    setSelectedKeys(index.toString());
   }
  }, [ pathname]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-[100vh]'>
        <div className="demo-logo-vertical px-3" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKeys]}
          items={admin.map((item, index) => (
            {
              key: index.toString(),
              icon: item.icon === LogoImg 
                ? (
                  <img 
                    src={LogoImg} 
                    alt="Logo" 
                    className="w-10 h-auto rounded-full object-cover"  
                  />
                )
                : React.createElement(item.icon),  
              label: (
                <NavLink
                  to={item.path}
                  className="text-white hover:text-white focus:text-white" 
                >
                  {item.content === "Himiko" ? (
                    <span className="ml-2 text-xl font-bold">Himiko</span> 
                  ) : item.content}
                </NavLink>
              ),
            }
          ))}
        />
      </Sider>
      <Layout >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
       <div className='p-3'>
       <Outlet 
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         
        </Outlet>
       </div>
      </Layout>
    </Layout>
  );
};

export default Admin;

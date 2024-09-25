import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import App from '../App';
import { SignIn, SignUp, AdminLayout, Product,Category,Ads,Brands,BrandsCategory,Settings,Stock,Himiko } from '@pages';

export const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
            <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
                <Route path='admin-layout' element={<AdminLayout/>}>
                
                <Route index element={<Product/>}/>
                <Route path='category' element={<Category/>}/>
                <Route path='brands' element={<Brands/>}/>
                <Route path='brands-category' element={<BrandsCategory/>}/>
                <Route path='Stock' element={<Stock/>}/>
                <Route path='setting' element={<Settings/>}/>
                <Route path='ads' element={<Ads/>}/>
                <Route path='himiko' element={<Himiko/>}/>
                </Route>
            </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
};

export default Index;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadcrumbExample = () => {

    const location = useLocation();
    const [list, setList] = useState(localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : []);
    useEffect(() => {
        const loadData = () => {
            const splitList = location?.pathname?.split("/");
            const pathValue = splitList[1] || "";
            if (!pathValue) {
                return;
            }
            if (pathValue == 'delivery') {
                setList([]);
                return;
            }
            const selectedIndex = list.findIndex(x => x.pathname === pathValue);
            if (selectedIndex !== -1) {
                list.splice(selectedIndex + 1);
                setList([...list])
            } else {
                setList([...list, { pathname: pathValue, url: location?.pathname }])
            }
            localStorage.setItem("list", JSON.stringify(list));
        }
        loadData();
    }, [location?.pathname]);

    return (
        <Breadcrumb>
            {list?.map((breadcrumb, index) => {
                if (list.length - 1 === index) {
                    return <Breadcrumb.Item key={breadcrumb?.pathname} active href="#">{breadcrumb?.pathname}</Breadcrumb.Item>
                }
                return <Breadcrumb.Item key={breadcrumb?.pathname} href={breadcrumb?.url}>{breadcrumb?.pathname}</Breadcrumb.Item>
            })}
        </Breadcrumb>
    );
}

export { BreadcrumbExample };
import React, { useState, useEffect } from 'react';
import apiConfig from '../../api/apiConfig';

const ProductionList = props => {


    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        setCompanies(props.companies.slice(0, 3))
    }, []);

    return (
        <div className="casts">
            {
                companies.map((item, i) => (
                    <div key={i} className="companies__item">
                        <div className="companies__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.logo_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                        <p className="casts__item__name highlight-text">({item.origin_country})</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductionList;

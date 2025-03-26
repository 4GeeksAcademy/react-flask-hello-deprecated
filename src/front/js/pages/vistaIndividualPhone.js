import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { RelatedProducts } from "../component/related-products";
import { ProductInfoPhone } from "../component/productInfoPhone";

export const VistaIndividualPhone = () => {

    const { actions } = useContext(Context)

    useEffect(() => {
        actions.setNegativeColors()
    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = "rgb(234, 248, 252)";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <>
            <ProductInfoPhone />
            <RelatedProducts productType="phones" />
        </>
    );
};

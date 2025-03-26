import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { RelatedProducts } from "../component/related-products";
import { ProductInfoTv } from "../component/productInfoTv";

export const VistaIndividualTv = () => {
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.setNegativeColors();
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "rgb(234, 248, 252)";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <>
            <ProductInfoTv />
            <RelatedProducts productType="tvs" />
        </>
    );
};

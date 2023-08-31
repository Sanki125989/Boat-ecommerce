import React, { useContext } from "react";
import { Context } from "../../../utils/context";

function ShoGSTLogo() {
  const { deliveryMessage } = useContext(Context);

  return (
    <div>
      <div class="py-2" style={{ fontSize: "86%" }}>
        <div class="text-center row justify-content-around">
          <div class="col-1">
            <div>
              <div>
                <img
                  alt=""
                  loading="lazy"
                  src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/1_year_warranty_small.svg?v=1682334235"
                  width="35px"
                />
              </div>
              <strong>1 Year Warranty</strong>
            </div>
          </div>

          <div class="col-1">
            <div>
              <div>
                <img
                  alt=""
                  loading="lazy"
                  src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/7_day_return_small.svg?v=1682334271"
                  width="45px"
                />
              </div>
              <strong>7 Day Replacement</strong>
              <br />
            </div>
          </div>

          <div class="col-1">
            <div>
              <div>
                <img
                  alt=""
                  loading="lazy"
                  src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/Free_shipping_small.svg?v=1682334419"
                  width="55px"
                />
              </div>
              <br />
              <strong>{deliveryMessage}</strong>
            </div>
          </div>

          <div class="col-1">
            <div style={{ marginLeft: "-11px" }}>
              <div>
                <img
                  alt=""
                  loading="lazy"
                  src="//cdn.shopify.com/s/files/1/0057/8938/4802/files/gst_billing_d805e54f-4a0a-44f4-8a04-3f751d4dce01_small.svg?v=1682490396"
                  width="35px"
                />
              </div>
              <br />
              <strong>GST Billing</strong> <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoGSTLogo;

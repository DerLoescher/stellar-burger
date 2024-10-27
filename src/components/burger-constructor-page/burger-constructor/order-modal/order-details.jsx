import PropTypes from "prop-types";
import doneImage from "../../../../assets/images/done.png";

import Modal from "../../../base/modal/modal";

const OrderDetails = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <>
        <p className="text text_type_digits-large mb-8 mt-4">
          {props.orderNumber}
        </p>

        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

        <img className="mb-15" src={doneImage} alt="Готово" />

        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>

        <p className="text text_type_main-default text_color_inactive pb-15">
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    </Modal>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;

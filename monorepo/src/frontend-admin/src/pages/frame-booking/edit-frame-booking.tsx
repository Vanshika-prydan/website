import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FrameBookingModel } from '../../models/frame-booking.model';
import apiService from '../../services/api-service';
import { fetchAllEmployees } from '../../store/employee';
import { updateFrameBooking } from '../../store/frame-booking';
import { RootState } from '../../store/rootReducer';
import generateErrorMessage from '../../utils/generate-error-message';
import EditFrameBookingDialogPresenter from './edit-frame-booking-presenter';

interface Props {
  frameBooking: FrameBookingModel;
}

const EditFrameBookingDialog = (props: Props) => {
  const employeeStore = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch();

  const {
    frameBooking: {
      employee: { employeeId },
      frameBookingId,
    },
  } = props;
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employeeId);

  useEffect(() => {
    if (!employeeStore.fetched) {
      dispatch(fetchAllEmployees());
    }
  }, []);

  const edit = async () => {
    setIsLoading(true);
    try {
      const frameBooking = await apiService.editFrameBooking({
        frameBookingId,
        employeeId: selectedEmployeeId,
      });
      dispatch(updateFrameBooking(frameBooking));

      setOpen(false);
    } catch (e) {
      setErrorMessage(generateErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditFrameBookingDialogPresenter
      {...{
        open,
        setOpen,
        employeeIsFetched: employeeStore.fetched,
        employees: employeeStore.employees,
        setSelectedEmployeeId,
        selectedEmployeeId,
        errorMessage,
        isLoading,
        edit,
      }}
    />
  );
};

export default EditFrameBookingDialog;

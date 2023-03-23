import type { ConfigProps, ArgsProps } from 'antd/lib/notification';
import type { ModalFunc } from 'antd/lib/modal/confirm';
import type { ModalFuncProps } from 'antd/lib/modal/Modal';

import { isString } from '@/utils/is';
import { Modal, notification, message as Message } from 'antd';

import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';

export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: String): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'type'> {
  type: 'warning' | 'success' | 'error' | 'info';
}
export declare type IconType = 'success' | 'info' | 'error' | 'warning';

export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>;

interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled />;
  } else if (iconType === 'success') {
    return <CheckCircleFilled />;
  } else if (iconType === 'info') {
    return <InfoCircleFilled />;
  } else {
    return <CloseCircleFilled />;
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div dangerouslySetInnerHTML={{ __html: `<div>${content as string}</div>` }} />;
  } else {
    return content;
  }
}

function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.type || 'warning';
  Reflect.deleteProperty(options, 'type');

  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  };

  return Modal.confirm(opt) as unknown as ConfirmOptions;
}

const getBaseOptions = () => {
  return {
    okText: '确认',
    centered: true,
  };
};

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'));
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'));
}

notification.config({
  placement: 'topRight',
  duration: 3,
});

export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}

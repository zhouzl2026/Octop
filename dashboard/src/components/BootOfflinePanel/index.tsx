import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { OctopEmptyMascot } from "../EmptyState";
import styles from "./BootOfflinePanel.module.less";

interface BootOfflinePanelProps {
  /** Defaults to a full page reload. */
  onRetry?: () => void;
  /** Optional raw error detail — makes misroutes diagnosable on screen. */
  detail?: string;
}

/**
 * Full-viewport panel when startup health / setup / auth probes cannot reach
 * the API (offline or backend down). Prefer this over a blank spinner shell.
 */
export default function BootOfflinePanel({ onRetry, detail }: BootOfflinePanelProps) {
  const { t } = useTranslation();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  return (
    <div role="alert" className={styles.wrap}>
      <Result
        className={styles.result}
        icon={<OctopEmptyMascot />}
        title={t("errors.offlineTitle")}
        subTitle={
          detail ? (
            <span style={{ display: "block", maxWidth: 560, margin: "0 auto" }}>
              {t("errors.offlineSubtitle")}
              <code
                style={{
                  display: "block",
                  marginTop: 8,
                  fontSize: 12,
                  color: "#8A8D96",
                  wordBreak: "break-all",
                }}
              >
                {detail}
              </code>
            </span>
          ) : (
            t("errors.offlineSubtitle")
          )
        }
        extra={
          <Button type="primary" onClick={handleRetry}>
            {t("errors.retry")}
          </Button>
        }
      />
    </div>
  );
}

import { PageHeader } from "@/components/shared/page-header"
import { AccountSettings } from "@/components/settings/account-settings"
import { OrganizationSettings } from "@/components/settings/organization-settings"

export function SettingsView() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage organization and account details."
      />
      <div className="grid gap-6">
        <OrganizationSettings />
        <AccountSettings />
      </div>
    </div>
  )
}

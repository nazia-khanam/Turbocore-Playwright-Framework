import { test } from '@playwright/test';
import { GeneratedFlowPage } from '../pages/GeneratedFlowPage';

const scenarios = [
  'bell_icon_unread_badge_no_count',
  'open_notification_overlay',
  'reverse_chronological_order',
  'notification_text_and_icon',
  'mention_notification_online_offline',
  'mention_notification_click_target',
  'assignment_notification_format',
  'assignment_notification_click_target',
  'added_member_notification',
  'added_member_click_target',
  'added_position_marker',
  'status_change_notification',
  'status_change_navigation',
  'workstream_unread_dot',
  'unread_dot_per_user',
  'unread_divider_first_unread',
  'unread_divider_per_user',
  'mention_target_precedence',
  'mark_all_as_read',
  'empty_overlay_state',
  'multiple_notification_types',
  'actor_identity',
  'repeated_status_changes',
  'in_app_only_scope',
  'near_real_time_delivery',
  'unsupported_events',
  'optional_filter_tabs',
  'no_numeric_count',
];

for (const [index, scenario] of scenarios.entries()) {
  test(`scenario_${String(index + 1).padStart(2, '0')}_${scenario}`, async ({ page }) => {
    const flow = new GeneratedFlowPage(page);
    await flow.performLogin();
    await flow.prepareScenario(`scenario_${index + 1}`);
    await flow.executeScenario(`scenario_${index + 1}`);
    await flow.verifyExpectedOutcome(`scenario_${index + 1}`);
  });
}

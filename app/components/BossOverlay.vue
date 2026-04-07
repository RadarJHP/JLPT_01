<script setup lang="ts">
const boss = useBossMode()

// Plausible-looking budget rows. No Japanese anywhere.
const headers = ['#', 'Account', 'Owner', 'Q1', 'Q2', 'Q3', 'Q4', 'YTD', 'Status']
const rows = [
  ['001', 'NA - Direct',     'J. Park',   '12,430', '14,210', '15,890', '17,200', '59,730', 'On Track'],
  ['002', 'NA - Channel',    'M. Lee',    '8,221',  '7,940',  '9,510',  '10,330', '36,001', 'Review'],
  ['003', 'EMEA - Direct',   'S. Kim',    '6,540',  '6,802',  '7,230',  '7,900',  '28,472', 'On Track'],
  ['004', 'EMEA - Partner',  'H. Choi',   '4,210',  '4,330',  '5,002',  '5,610',  '19,152', 'At Risk'],
  ['005', 'APAC - Direct',   'Y. Tanaka', '9,840',  '10,012', '11,234', '12,500', '43,586', 'On Track'],
  ['006', 'APAC - Channel',  'D. Wong',   '5,231',  '5,498',  '6,012',  '6,780',  '23,521', 'On Track'],
  ['007', 'LATAM',           'R. Silva',  '2,210',  '2,540',  '2,810',  '3,120',  '10,680', 'Review'],
  ['008', 'Renewal Base',    'K. Jeong',  '15,000', '15,400', '15,820', '16,210', '62,430', 'On Track'],
  ['009', 'Services',        'B. Yoon',   '3,420',  '3,560',  '3,880',  '4,100',  '14,960', 'On Track'],
  ['010', 'Education',       'L. Han',    '1,210',  '1,340',  '1,520',  '1,700',  '5,770',  'New'],
  ['011', 'OEM',             'P. Kang',   '7,800',  '8,120',  '8,540',  '9,010',  '33,470', 'On Track'],
  ['012', 'Federal',         'C. Oh',     '4,600',  '4,720',  '5,030',  '5,310',  '19,660', 'Review'],
  ['013', 'State / Local',   'I. Bae',    '2,140',  '2,250',  '2,380',  '2,510',  '9,280',  'On Track'],
  ['014', 'Healthcare',      'N. Sim',    '6,210',  '6,420',  '6,810',  '7,200',  '26,640', 'On Track'],
  ['015', 'Financial Svcs',  'T. Ko',     '8,440',  '8,710',  '9,100',  '9,640',  '35,890', 'On Track'],
  ['016', 'Manufacturing',   'A. Min',    '5,330',  '5,540',  '5,830',  '6,120',  '22,820', 'At Risk'],
  ['017', 'Retail',          'E. Jung',   '4,920',  '5,110',  '5,420',  '5,710',  '21,160', 'On Track'],
  ['018', 'Energy',          'O. Shin',   '3,810',  '3,990',  '4,230',  '4,520',  '16,550', 'Review'],
  ['019', 'Tech',            'V. Lim',    '11,200', '11,640', '12,310', '13,000', '48,150', 'On Track'],
  ['020', 'Public Sector',   'F. Joo',    '2,820',  '2,940',  '3,130',  '3,310',  '12,200', 'On Track'],
]

function dismiss() { boss.hide() }
</script>

<template>
  <Teleport to="body">
    <div v-if="boss.active.value" class="boss-overlay" @click="dismiss">
      <!-- Title bar -->
      <div style="background: #f3f4f6; border-bottom: 1px solid #d1d5db; padding: 6px 12px; display: flex; align-items: center; gap: 12px; font-size: 12px;">
        <strong style="font-weight: 600;">📊 FY2026_Budget_Forecast_v14_FINAL.xlsx</strong>
        <span style="color: #6b7280;">— Read-Only</span>
        <span style="margin-left: auto; color: #6b7280;">Auto-saved 14:32</span>
      </div>
      <!-- Toolbar -->
      <div style="background: #fafafa; border-bottom: 1px solid #e5e7eb; padding: 4px 12px; font-size: 11px; color: #6b7280; display: flex; gap: 16px;">
        <span>File</span><span>Home</span><span>Insert</span><span>Page Layout</span>
        <span>Formulas</span><span>Data</span><span>Review</span><span>View</span>
      </div>
      <!-- Formula bar -->
      <div style="background: #fff; border-bottom: 1px solid #e5e7eb; padding: 4px 12px; font-size: 11px; display: flex; align-items: center; gap: 8px;">
        <span style="color: #9ca3af;">A1</span>
        <span style="color: #9ca3af;">fx</span>
        <span>=SUM(D2:D21)</span>
      </div>
      <!-- Grid -->
      <div style="padding: 0;">
        <table>
          <thead>
            <tr>
              <th v-for="h in headers" :key="h">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td v-for="(cell, j) in row" :key="j" :style="j === 0 ? 'background:#f3f4f6;color:#6b7280;text-align:center;' : ''">
                {{ cell }}
              </td>
            </tr>
            <tr style="background: #f9fafb; font-weight: 600;">
              <td colspan="3" style="text-align: right;">TOTAL</td>
              <td>125,581</td>
              <td>129,578</td>
              <td>137,182</td>
              <td>146,790</td>
              <td>539,131</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Status bar -->
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #f3f4f6; border-top: 1px solid #d1d5db; padding: 4px 12px; font-size: 11px; color: #6b7280; display: flex; gap: 16px;">
        <span>Ready</span>
        <span>Sheet 1 of 4</span>
        <span style="margin-left: auto;">Sum: 539,131 · Avg: 26,956 · Count: 20</span>
        <span>100%</span>
      </div>
    </div>
  </Teleport>
</template>

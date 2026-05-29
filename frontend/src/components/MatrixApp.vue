<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">◈</span>
          <span class="logo-text">Code<strong> Challenge!</strong></span>
        </div>
        <p class="header-sub">Factorización QR · Rotación · Estadísticas</p>
      </div>
    </header>

    <main class="main">
      <section class="card input-card">
        <h2 class="section-title">Configurar matriz</h2>

        <div class="size-controls">
          <div class="size-field">
            <label>Filas</label>
            <input
              type="number"
              v-model.number="rows"
              min="2"
              max="6"
              @change="updateMatrix"
            />
          </div>
          <div class="size-divider">×</div>
          <div class="size-field">
            <label>Columnas</label>
            <input
              type="number"
              v-model.number="cols"
              min="2"
              max="6"
              @change="updateMatrix"
            />
          </div>
        </div>

        <div
          class="matrix-grid"
          :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }"
        >
          <template v-for="(row, i) in matrixInput" :key="i">
            <input
              v-for="(_, j) in row"
              :key="`${i}-${j}`"
              type="number"
              v-model.number="matrixInput[i][j]"
              class="cell"
              step="any"
            />
          </template>
        </div>

        <button class="btn-primary" @click="handleSubmit" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Calcular →</span>
        </button>

        <p v-if="error" class="error-msg">{{ error }}</p>
      </section>

      <div v-if="result" class="results">
        <div class="results-row">
          <section class="card">
            <h2 class="section-title">Matriz original</h2>
            <div
              class="matrix-display"
              :style="{
                gridTemplateColumns: `repeat(${result.original[0].length}, 1fr)`,
              }"
            >
              <template v-for="(row, i) in result.original" :key="i">
                <span
                  v-for="(v, j) in row"
                  :key="`o-${i}-${j}`"
                  class="cell-display"
                  >{{ formatVal(v) }}</span
                >
              </template>
            </div>
          </section>

          <section class="card">
            <h2 class="section-title">Matriz rotada 90°</h2>
            <div
              class="matrix-display"
              :style="{
                gridTemplateColumns: `repeat(${result.matrixRotated[0].length}, 1fr)`,
              }"
            >
              <template v-for="(row, i) in result.matrixRotated" :key="i">
                <span
                  v-for="(v, j) in row"
                  :key="`r-${i}-${j}`"
                  class="cell-display accent"
                  >{{ formatVal(v) }}</span
                >
              </template>
            </div>
          </section>
        </div>

        <div class="results-row">
          <section class="card">
            <h2 class="section-title">Matriz Q</h2>
            <div
              class="matrix-display"
              :style="{
                gridTemplateColumns: `repeat(${result.Q[0].length}, 1fr)`,
              }"
            >
              <template v-for="(row, i) in result.Q" :key="i">
                <span
                  v-for="(v, j) in row"
                  :key="`q-${i}-${j}`"
                  class="cell-display"
                  >{{ formatVal(v) }}</span
                >
              </template>
            </div>
          </section>

          <section class="card">
            <h2 class="section-title">Matriz R</h2>
            <div
              class="matrix-display"
              :style="{
                gridTemplateColumns: `repeat(${result.R[0].length}, 1fr)`,
              }"
            >
              <template v-for="(row, i) in result.R" :key="i">
                <span
                  v-for="(v, j) in row"
                  :key="`r-${i}-${j}`"
                  class="cell-display"
                  >{{ formatVal(v) }}</span
                >
              </template>
            </div>
          </section>
        </div>

        <section class="card stats-card">
          <h2 class="section-title">Estadísticas</h2>
          <div class="stats-grid">
            <div class="stat">
              <span class="stat-label">Máximo</span>
              <span class="stat-value">{{
                formatVal(result.statistics.max)
              }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Mínimo</span>
              <span class="stat-value">{{
                formatVal(result.statistics.min)
              }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Promedio</span>
              <span class="stat-value">{{
                formatVal(result.statistics.avg)
              }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Suma total</span>
              <span class="stat-value">{{
                formatVal(result.statistics.sum)
              }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Q diagonal</span>
              <span
                class="stat-value badge"
                :class="result.statistics.isDiagonalQ ? 'yes' : 'no'"
              >
                {{ result.statistics.isDiagonalQ ? 'Sí' : 'No' }}
              </span>
            </div>
            <div class="stat">
              <span class="stat-label">R diagonal</span>
              <span
                class="stat-value badge"
                :class="result.statistics.isDiagonalR ? 'yes' : 'no'"
              >
                {{ result.statistics.isDiagonalR ? 'Sí' : 'No' }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { QRResult } from '../utils/matrixUtils';
import { formatVal, resizeMatrix } from '../utils/matrixUtils';
import { computeQR } from '../services/matrixService';

const rows = ref<number>(2);
const cols = ref<number>(2);
const matrixInput = ref<number[][]>(
  Array.from({ length: 2 }, () => Array(2).fill(0))
);
const loading = ref(false);
const result = ref<QRResult | null>(null);
const error = ref('');

const updateMatrix = () => {
  matrixInput.value = resizeMatrix(matrixInput.value, rows.value, cols.value);
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  result.value = null;
  try {
    result.value = await computeQR(matrixInput.value);
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error connecting to API';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f0f7ff;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  background: #0066cc;
  padding: 1.5rem 2rem;
  color: white;
  margin: auto;
}

.header-inner {
  max-width: 656px;
  outline: '1px solid black';
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.logo-icon {
  font-size: 1.6rem;
  opacity: 0.85;
}
.logo-text strong {
  font-weight: 700;
}
.header-sub {
  font-size: 0.85rem;
  opacity: 0.75;
  margin: 0;
}

.main {
  max-width: 656px;
  margin: 0 auto;
  padding: 2rem 0px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #dce8f8;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #0066cc;
  margin: 0 0 1rem;
}

.size-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.size-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.size-field label {
  font-size: 0.75rem;
  color: #666;
}

.size-field input {
  width: 70px;
  padding: 6px 10px;
  border: 1px solid #cde;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  outline: none;
}

.size-field input:focus {
  border-color: #0066cc;
}

.size-divider {
  font-size: 1.4rem;
  color: #aac;
  margin-top: 18px;
}

.matrix-grid {
  display: grid;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.cell {
  padding: 10px;
  border: 1px solid #cde;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s;
}

.cell:focus {
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.btn-primary {
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 2rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary:hover {
  background: #0055aa;
}
.btn-primary:disabled {
  background: #99bfe8;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-msg {
  color: #cc3300;
  font-size: 0.85rem;
  margin-top: 0.75rem;
  padding: 8px 12px;
  background: #fff0ed;
  border-radius: 6px;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.results-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.matrix-display {
  display: grid;
  gap: 6px;
}

.cell-display {
  background: #f0f7ff;
  border-radius: 6px;
  padding: 8px 4px;
  text-align: center;
  font-size: 0.8rem;
  font-family: monospace;
  color: #334;
}

.cell-display.accent {
  background: #e6f0ff;
  color: #0055aa;
  font-weight: 600;
}

.stats-card .stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat {
  background: #f5f9ff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #889;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #112244;
}

.badge {
  display: inline-block;
  font-size: 0.85rem;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 600;
  width: fit-content;
}

.badge.yes {
  background: #e6f4ea;
  color: #1a7a3a;
}
.badge.no {
  background: #fdecea;
  color: #c0392b;
}
</style>

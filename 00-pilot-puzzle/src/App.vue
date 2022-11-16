<template>
  <div class="min-h-[calc(100vh-48px)] flex flex-col justify-center items-center">
    <section class="grid grid-cols-3 grid-rows-3 mx-auto bg-gray-dark gap-[1px] mb-6">
      <template v-for="(_row, rowIdx) in gameData.length" :key="`${rowIdx}`">
        <Cell
          v-for="(_col, colIdx) in gameData[rowIdx].length"
          :key="`${rowIdx}-${colIdx}`"
          :id="`${rowIdx}-${colIdx}`"
          :value="gameData[rowIdx][colIdx]"
          :isDisabled="hasWinner || hasEnded"
          @on-select="onCellClick"
        />
      </template>
    </section>

    <section class="flex flex-col justify-center items-center">
      <template v-if="hasWinner">
        <p class="text-center text-green mb-4">
          WINNER is player <span class="font-bold">{{ winnerplayer }}</span>
        </p>
        <button class="px-3 py-2 rounded-sm text-gray-dark bg-green" @click="resetGame">
          Play again
        </button>
      </template>

      <template v-else-if="hasEnded">
        <p class="text-center text-green mb-4">It's a draw!</p>
        <button class="px-3 py-2 rounded-sm text-gray-dark bg-green" @click="resetGame">
          Play again
        </button>
      </template>

      <p v-else class="text-lg">
        Current player: <span class="font-bold text-green">{{ currentPlayer }}</span>
      </p>
    </section>
  </div>
</template>

<script>
import Cell from './components/Cell.vue'

const players = {
  player1: 'X',
  player2: 'O',
}

export default {
  components: {
    Cell,
  },
  data() {
    return {
      gameData: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      winnerplayer: '',
      currentPlayer: players.player1,
      hasEnded: false,
    }
  },
  computed: {
    hasWinner() {
      const rowHasWinner = this.handleRowTracking()
      if (rowHasWinner) return rowHasWinner

      const colHasWinner = this.handleColTracking()
      if (colHasWinner) return colHasWinner

      const diagonalHasWinner = this.handleDiagonalTracking()
      if (diagonalHasWinner) return diagonalHasWinner

      return false
    },
    hasEnded() {
      return this.gameData.flat().filter(Boolean).length === 9
    },
  },
  methods: {
    onCellClick(cellId) {
      const [rowIdx, colIdx] = cellId.split('-').map(idx => Number(idx))
      this.gameData[rowIdx][colIdx] = this.currentPlayer
      this.changeCurrentPlayer()
    },
    changeCurrentPlayer() {
      if (this.currentPlayer === players.player1) {
        this.currentPlayer = players.player2
      } else {
        this.currentPlayer = players.player1
      }
    },
    trackSelectionArray(selections) {
      let hasWon = false
      return selections.some(row => {
        const validItems = row.filter(Boolean)
        if (validItems.length !== 3) return

        const uniqueItems = [...new Set(validItems)]
        hasWon = uniqueItems.length === 1
        if (hasWon) {
          this.winnerplayer = uniqueItems[0]
        }
        return hasWon
      })
    },
    handleRowTracking() {
      return this.trackSelectionArray(this.gameData)
    },
    handleColTracking() {
      const maxColIdx = 3
      const columnsData = []
      for (let colIdx = 0; colIdx < maxColIdx; colIdx++) {
        columnsData[colIdx] = this.gameData.map(row => row[colIdx])
      }
      return this.trackSelectionArray(columnsData)
    },
    handleDiagonalTracking() {
      const diagonalSelections = [
        [this.gameData[0][0], this.gameData[1][1], this.gameData[2][2]],
        [this.gameData[0][2], this.gameData[1][1], this.gameData[2][0]],
      ]
      return this.trackSelectionArray(diagonalSelections)
    },
    resetGame() {
      this.gameData = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]
    },
  },
}
</script>

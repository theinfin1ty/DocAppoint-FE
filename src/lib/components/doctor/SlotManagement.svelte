<script>
  import { onMount } from 'svelte';
  import { getDoctorSlots, updateSlotSettings, blockSlot, unblockSlot } from '$lib/api/slots';
  import Modal from '$lib/components/ui/Modal.svelte';

  let slots = [];
  let settings = {
    slotDuration: 30,
    startTime: '09:00',
    endTime: '17:00',
    breakStart: '13:00',
    breakEnd: '14:00',
    workingDays: [1, 2, 3, 4, 5, 6] // Monday to Saturday
  };
  let showSettingsModal = false;
  let selectedDate = new Date().toISOString().split('T')[0];
  let loading = false;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  onMount(async () => {
    await loadSlots();
  });

  const loadSlots = async () => {
    loading = true;
    const response = await getDoctorSlots();
    if (response) {
      slots = response.slots || [];
      settings = { ...settings, ...response.settings };
    }
    loading = false;
  };

  const saveSettings = async () => {
    const response = await updateSlotSettings(settings);
    if (response) {
      showSettingsModal = false;
      await loadSlots();
    }
  };

  const toggleSlotBlock = async (date, slot) => {
    const slotData = slots.find(s => s.date === date && s.slot === slot);
    if (slotData?.blocked) {
      await unblockSlot(date, slot);
    } else {
      await blockSlot(date, slot);
    }
    await loadSlots();
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(`2000-01-01T${settings.startTime}`);
    const end = new Date(`2000-01-01T${settings.endTime}`);
    const breakStart = new Date(`2000-01-01T${settings.breakStart}`);
    const breakEnd = new Date(`2000-01-01T${settings.breakEnd}`);
    
    let current = new Date(start);
    while (current < end) {
      const timeStr = current.toTimeString().slice(0, 5);
      const isBreakTime = current >= breakStart && current < breakEnd;
      
      if (!isBreakTime) {
        slots.push(timeStr);
      }
      
      current.setMinutes(current.getMinutes() + settings.slotDuration);
    }
    return slots;
  };

  const getSlotStatus = (date, slot) => {
    const slotData = slots.find(s => s.date === date && s.slot === slot);
    if (slotData?.blocked) return 'blocked';
    if (slotData?.booked) return 'booked';
    return 'available';
  };
</script>

<div class="p-4 sm:p-6">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Slot Management</h2>
    <button
      on:click={() => showSettingsModal = true}
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
    >
      Settings
    </button>
  </div>

  <div class="mb-6">
    <label for="date" class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
    <input
      type="date"
      id="date"
      bind:value={selectedDate}
      class="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>

  {#if loading}
    <div class="text-center py-8">Loading...</div>
  {:else}
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
      {#each generateTimeSlots() as slot}
        {@const status = getSlotStatus(selectedDate, slot)}
        <button
          on:click={() => toggleSlotBlock(selectedDate, slot)}
          disabled={status === 'booked'}
          class="p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[60px] sm:min-h-[70px]
            {status === 'available' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
            {status === 'blocked' ? 'bg-red-100 text-red-800 hover:bg-red-200' : ''}
            {status === 'booked' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          "
        >
          <div class="font-semibold">{slot}</div>
          <div class="text-xs mt-1 capitalize">{status}</div>
        </button>
      {/each}
    </div>
  {/if}

  <div class="mt-6 flex flex-wrap gap-3 sm:gap-4 text-sm">
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-green-100 rounded"></div>
      <span>Available</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-red-100 rounded"></div>
      <span>Blocked</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-gray-100 rounded"></div>
      <span>Booked</span>
    </div>
  </div>
</div>

<Modal bind:isOpen={showSettingsModal} title="Slot Settings">
  <form on:submit|preventDefault={saveSettings} class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Slot Duration (minutes)</label>
      <select bind:value={settings.slotDuration} class="w-full border border-gray-300 rounded-lg px-3 py-2">
        <option value={15}>15 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <input
          type="time"
          bind:value={settings.startTime}
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <input
          type="time"
          bind:value={settings.endTime}
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Break Start</label>
        <input
          type="time"
          bind:value={settings.breakStart}
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Break End</label>
        <input
          type="time"
          bind:value={settings.breakEnd}
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
      <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {#each dayNames as day, index}
          <label class="flex items-center justify-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              bind:group={settings.workingDays}
              value={index}
              class="mr-1 sm:mr-2"
            />
            <span class="text-xs sm:text-sm">{day.slice(0, 3)}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
      <button
        type="button"
        on:click={() => showSettingsModal = false}
        class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 order-2 sm:order-1"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 order-1 sm:order-2"
      >
        Save Settings
      </button>
    </div>
  </form>
</Modal>